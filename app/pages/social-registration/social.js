define([
    "app",
    "modules/user.model",
    "validator/validator",
    "backbone"
],

function( app, User, Validator ) {

    return Backbone.View.extend({

        el: $("body"),

        validator: null,
        
        initialize: function() {
            this.model = new User();
            this.$("label[for*='zeega_user_registration_social_username']").append(" <span class='username-validation'></span>");
            $(".username-preview").text( $("#zeega_user_registration_social_username").val());

            this.initValidation();
        },

        initValidation: function() {
            this.validator = new Validator({
                facets:[
                    {
                        type: "email",
                        $el: this.$("#zeega_user_registration_social_email")
                    }, {
                        type: "username",
                        $el: this.$("#zeega_user_registration_social_username"),
                        omits: "zeega,admin",
                        minLength: 3
                    }
                ]
            });

            this.validator.on("validated", this.onValidation, this );
        },

        onValidation: function( response ) {

            if ( response.valid ) {
                this.$(".submit").removeClass("btnz-disabled");
            } else {
                this.$(".submit").addClass("btnz-disabled");
            }
        },

        events: {
            "click .submit": "saveUserModel",
            "keyup #zeega_user_registration_social_username": "onUsernameKeydown",
        },

        onUsernameKeydown: function( e ) {
            var charCode = e.which,
                isLetter = !(charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)),
                isNumber = charCode >= 48 && charCode <= 57,
                isOkay = isLetter || isNumber;

            return isOkay;
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
