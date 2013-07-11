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
            this.$("label[for*='zeega_user_registration_social_username']").append(" <span class='username-validation'></span>");
            $(".username-preview").text( $("#zeega_user_registration_social_username").val());
        },

        events: {
            "click .submit": "settingsSubmit",
            "blur #zeega_user_registration_social_username": "validateUsername",
            "keyup #zeega_user_registration_social_username": "onUsernameKeydown",
            "paste #zeega_user_registration_social_username": "onPaste",
            "keydown input": "onAnyInput"
        },

        onAnyInput: function() {
            $(".submit")
                .text("Save Updates").removeClass("btnz-flat");
        },

        onPaste: function() {
            $(".username-validation").empty();
            _.delay(function() {
                var pastedContent = $("#zeega_user_registration_social_username").val(),
                    cleansedContent = pastedContent.replace(/[^a-z0-9]/gi,"");

                $("#zeega_user_registration_social_username").val( cleansedContent );
            }, 250 );
        },

        onUsernameKeydown: function( e ) {
            var charCode = e.which,
                isLetter = !(charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)),
                isNumber = charCode >= 48 && charCode <= 57,
                isOkay = isLetter || isNumber;

            this.disableSubmit();
            this.valid = false;
            $(".username-validation").empty();
            
            if ( isOkay ) {
                $(".username-preview").text( $("#zeega_user_registration_social_username").val());
            }

            this.lazyValidate( this );

            return isOkay;
        },

        lazyValidate: _.debounce(function( ctx ) {
            ctx.validateUsername();
        }.bind(this), 1000 ),

        validateUsername: function() {
            this.isValidating = true;

            // broken in prod because of XDomain issues - 401
            $.get( app.metadata.api + "users/validate/" + this.$("#zeega_user_registration_social_username").val(), function(data) {
                this.valid = data.valid;
                if ( data.valid ) {
                    this.enableSubmit();
                    this.model.trigger("validated");
                    this.$(".username-validation").html("— <span class='valid'>ok!</span>");
                    $("#zeega_user_registration_social_username").removeClass("error");
                } else {
                    this.$(".username-validation").html("— <span class='invalid'>That username has already been taken :(</span>");
                    $("#zeega_user_registration_social_username").addClass("error");
                }
            }.bind(this))
            .fail(function( e ) {
                console.log("validation fail. Details:", e);
                this.$(".username-validation").html("— <span class='invalid'>Validation failed. Try again?</span>");
                $("#zeega_user_registration_social_username").addClass("error");
            }.bind(this))
            .always(function() {
                this.isValidating = false;
            }.bind(this));
            
        },

        enableSubmit: function() {
            this.$(".submit").removeClass("btnz-disabled");
        },

        disableSubmit: function() {
            this.$(".submit").addClass("btnz-disabled");
        },

        settingsSubmit: function() {

            $(".submit").addClass("btnz-disabled");
            if ( this.isValidating ) {
                this.model.once("validated", this.saveUserModel, this);
            } else if ( this.valid ) {
               this.saveUserModel();
            }
        },

        saveUserModel: function() {
            this.model.save({
                display_name: this.$("#display-name").val(),
                username: this.$("#zeega_user_registration_social_username").val(),
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
