define([
    "app",
    "modules/user.model",
    "backbone"
],

function( app, User ) {

    // TODO
    // validate email address

    return Backbone.View.extend({

        el: $("body"),

        valid: true,
        isValidating: false,
        
        initialize: function() {
            this.model = new User();
        },

        events: {
            "click .submit": "settingsSubmit",
            "blur #fos_user_registration_form_username": "validateUsername",
            "keyup #fos_user_registration_form_username": "onUsernameKeydown",
            "paste #fos_user_registration_form_username": "onPaste"
        },

        onPaste: function() {
            $(".username-validation").empty();
            _.delay(function() {
                var pastedContent = $("#fos_user_registration_form_username").val(),
                    cleansedContent = pastedContent.replace(/[^a-z0-9]/gi,"");

                $("#fos_user_registration_form_username").val( cleansedContent );
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
                $(".username-preview").text( $("#fos_user_registration_form_username").val());
            }

            return isOkay;
        },

        validateUsername: function() {
            this.isValidating = true;

            // broken in prod because of XDomain issues - 401
            $.get( app.metadata.api + "users/validate/" + this.$("#fos_user_registration_form_username").val(), function(data) {
                this.valid = data.valid;
                if ( data.valid ) {
                    this.model.trigger("validated");
                    this.$(".username-validation").html("<span class='valid'>ok!</span><br>");
                    $("#fos_user_registration_form_username").removeClass("error");
                } else {
                    this.$(".username-validation").html("<span class='invalid'>That username has already been taken :(</span><br>");
                    $("#fos_user_registration_form_username").addClass("error");
                }
            }.bind(this))
            .fail(function( e ) {
                console.log("validation fail. Details:", e);
                this.$(".username-validation").html("<span class='invalid'>Validation failed. Try again?</span><br>");
                $("#fos_user_registration_form_username").addClass("error");
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
                username: this.$("#fos_user_registration_form_username").val(),
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
