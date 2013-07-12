define([
    "app",
    "modules/user.model",
    "validator/validator",
    "backbone"
],

function( app, User, Validator ) {

    return Backbone.View.extend({

        el: $("body"),

        valid: true,
        isValidating: false,
        
        initialize: function() {
            this.model = new User();
            this.initValidation();
        },

        initValidation: function() {
            this.validator = new Validator({
                facets:[
                    {
                        type: "email",
                        $el: this.$("#fos_user_registration_form_email")
                    }, {
                        type: "username",
                        $el: this.$("#fos_user_registration_form_username"),
                        omits: "zeega,admin",
                        minLength: 3
                    }, {
                        type: "plaintext",
                        $el: this.$("#fos_user_registration_form_displayName"),
                        omits: "zeega,admin",
                        minLength: 3
                    }, {
                        type: "plaintext",
                        $el: this.$("#fos_user_registration_form_plainPassword"),
                        minLength: 6
                    }
                ]
            });

            this.validator.on("validated", this.onValidation, this );
        },

        onValidation: function( response ) {

            if ( response.valid ) {
                this.$(".submit").removeClass("btnz-disabled").addClass("btnz-green");
            } else {
                this.$(".submit").addClass("btnz-disabled").removeClass("btnz-green");
            }
        },


        events: {
            "click .submit": "settingsSubmit",
            "keyup #fos_user_registration_form_username": "onUsernameKeyup",
            "keydown #fos_user_registration_form_username": "onUsernameKeydown",
        },

        onUsernameKeydown: function( e ) {
            var charCode = e.which,
                isLetter = !(charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)),
                isNumber = charCode >= 48 && charCode <= 57,
                isArrow = charCode >= 37 && charCode <= 40,
                isOkay = isLetter || isNumber || isArrow;

            return isOkay;
        },

        onUsernameKeyup: function( e ) {
            if ( $(".help-block").is(":hidden") ) $(".help-block").fadeIn();
            $(".username-preview").text( $("#fos_user_registration_form_username").val());
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
                .addClass("btnz-success btnz-flat")
                .removeClass("btnz-disabled");
        }

    });


});
