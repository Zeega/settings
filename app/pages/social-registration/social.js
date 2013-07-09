define([
    "app",
    "modules/user.model",
    "backbone"
],

function( app, User ) {

    // TODO
    // validate email address

    return Backbone.View.extend({

        el: $(".social-registration .wrapper"),

        valid: true,
        isValidating: false,
        
        initialize: function() {
            this.model = new User();
        },

        events: {
            "click .submit": "settingsSubmit",
            "blur #form_username": "validateUsername",
            "keydown #form_username": "onUsernameKeydown",
            "paste #form_username": "onPaste",
            "keydown input": "onAnyInput"
        },

        onAnyInput: function() {
            $(".submit")
                .text("Save Updates")
                .addClass("btnz-red")
                .removeClass("btnz-disabled btnz-success btnz-flat");
        },

        onPaste: function() {
            $(".username-validation").empty();
            _.delay(function() {
                var pastedContent = $("#form_username").val(),
                    cleansedContent = pastedContent.replace(/[^a-z0-9]/gi,"");

                $("#form_username").val( cleansedContent );
            }, 250 );
        },

        onUsernameKeydown: function( e ) {
            var charCode = e.which,
                isLetter = !(charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)),
                isNumber = charCode >= 48 && charCode <= 57,
                isOkay = isLetter || isNumber;

            this.valid = false;
            $(".username-validation").empty();
            
            if ( isOkay ) {
                $(".username-preview").text( $("#form_username").val());
            }

            return isOkay;
        },

        validateUsername: function() {
            this.isValidating = true;

            // broken in prod because of XDomain issues - 401
            $.post( app.metadata.api + "users/validate",{ username: this.$("#form_username").val() }, function(data) {
                this.valid = data.valid;
                if ( data.valid ) {
                    this.model.trigger("validated");
                    this.$(".username-validation").html("— <span class='valid'>ok!</span>");
                    $("#form_username").removeClass("error");
                } else {
                    this.$(".username-validation").html("— <span class='invalid'>That username has already been taken :(</span>");
                    $("#form_username").addClass("error");
                }
            }.bind(this))
            .fail(function( e ) {
                console.log("validation fail. Details:", e);
                this.$(".username-validation").html("— <span class='invalid'>Validation failed. Try again?</span>");
                $("#form_username").addClass("error");
                // this.valid = true; // rm this. invalid. for testing
            }.bind(this))
            .always(function() {
                this.isValidating = false;
            }.bind(this));
            
        },

        settingsSubmit: function() {

            $(".submit").removeClass("btnz-red").addClass("btnz-disabled");
            if ( this.isValidating ) {
                this.model.once("validated", this.saveUserModel, this);
            } else if ( this.valid ) {
               this.saveUserModel();
            }
        },

        saveUserModel: function() {
            this.model.save({
                display_name: this.$("#display-name").val(),
                username: this.$("#form_username").val(),
                email: this.$("#email").val(),
                password: this.$("#password").val()
            });
            $(".submit")
                .text("Updates Saved!")
                .addClass("btnz-success btnz-flat")
                .removeClass("btnz-disabled");
        }

    });


});
