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

        isUsernameValid: function() {
            return this.valid;
        },

        isEmailValid: function() {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            return re.test( this.$("#fos_user_registration_form_email").val() );
        },

        isDisplayNameValid: function() {
            var reason,
                val = this.$("#fos_user_registration_form_displayName").val(),
                minLength = val.length > 2,
                omitsZeega = this.omits( val, "zeega"),
                omitsAdmin = this.omits( val, "admin");
                
            return {
                valid: minLength && omitsZeega && omitsAdmin,
                reason: !minLength ? "Username must be at least 3 characters" :
                        !omitsZeega ? "Cannot contain the word 'zeega'" :
                        !omitsAdmin ? "Cannot contain the word 'admin'" : "valid"
            };
        },

        omits: function( string, check ) {
            var regexp = new RegExp( check, "gi" ),
                tester = string.match(regexp);

            return tester === null;
        },

        isPasswordValid: function() {
            return this.$("#fos_user_registration_form_plainPassword").val().length > 5;
        },

        events: {
            "click .submit": "settingsSubmit",
            "blur #fos_user_registration_form_username": "validateUsername",
            "keyup #fos_user_registration_form_username": "onUsernameKeyup",
            "keydown #fos_user_registration_form_username": "onUsernameKeydown",
            "paste #fos_user_registration_form_username": "onPaste",

            "keyup #fos_user_registration_form_displayName": "onDisplayNameKeydown",
            "keyup #fos_user_registration_form_email": "onEmailKeyup",
            "keyup #fos_user_registration_form_plainPassword": "onPasswordKeyup"
        },

        onDisplayNameKeydown: function() {
            var validObj = this.isDisplayNameValid();

            this.$(".displayname-error").remove();
            if ( !validObj.valid ) {
                this.$("#fos_user_registration_form_displayName").after("<div class='displayname-error form-error-message'>"+ validObj.reason +"</div>");
            }
            this.isFormValid();
        },

        onEmailKeyup: function() {
            this.$(".email-error").remove();
            if ( !this.isEmailValid() ) {
                this.$("#fos_user_registration_form_email").after("<div class='email-error form-error-message'>Enter a valid email</div>");
            }
            this.isFormValid();
        },

        onPasswordKeyup: function() {
            this.$(".password-error").remove();
            if ( !this.isPasswordValid() ) {
                this.$("#fos_user_registration_form_plainPassword").after("<div class='password-error form-error-message'>Password must be at least 6 characters</div>");
            }
            this.isFormValid();
        },

        isFormValid: function() {

            if ( this.isUsernameValid() && this.isDisplayNameValid().valid && this.isEmailValid() && this.isPasswordValid() ) {
                this.$(".submit").removeClass("btnz-disabled");
            } else {
                this.$(".submit").addClass("btnz-disabled");
            }
        },

        onPaste: function() {
            $(".username-validation").empty();
            _.delay(function() {
                var pastedContent = $("#fos_user_registration_form_username").val(),
                    cleansedContent = pastedContent.replace(/[^a-z0-9]/gi,"");

                $("#fos_user_registration_form_username").val( cleansedContent );
            }, 250 );
        },

        onUsernameKeyup: function( e ) {
            this.isFormValid();
            $(".username-preview").text( $("#fos_user_registration_form_username").val());

        },

        onUsernameKeydown: function( e ) {
            var charCode = e.which,
                isLetter = !(charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)),
                isNumber = charCode >= 48 && charCode <= 57,
                isOkay = isLetter || isNumber;

            this.valid = false;
            $(".username-flash").remove();

            if ( $(".help-block").is(":hidden") ) $(".help-block").fadeIn();
            this.lazyValidate( this );

            return isOkay;
        },

        lazyValidate: _.debounce(function( ctx ) {
            ctx.validateUsername();
        }.bind(this), 1000 ),

        validateUsername: function() {
            this.isValidating = true;
            this.valid = false;

            this.isFormValid();

            if ( this.$("#fos_user_registration_form_username").val().length < 3 ) {
                $(".username-flash").remove();
                this.$("#fos_user_registration_form_username").after("<div class='username-flash form-error-message'>Username too short! It must be at least 3 characters</div>");
            } else {

                // broken in prod because of XDomain issues - 401
                $.get( app.metadata.api + "users/validate/" + this.$("#fos_user_registration_form_username").val(), function(data) {
                    this.valid = data.valid;
                    $(".username-flash").remove();
                    if ( data.valid ) {
                        this.model.trigger("validated");


                        this.$("#fos_user_registration_form_username").after("<div class='username-flash form-success-message'>Username is valid</div>");


                        // this.$(".username-validation").html("<span class='valid'>ok!</span>");
                        $("#fos_user_registration_form_username").removeClass("error");
                    } else {
                        this.$("#fos_user_registration_form_username").after("<div class='username-flash form-error-message'>That username has already been taken :(</div>");

                        // this.$(".username-validation").html("<span class='invalid'>That username has already been taken :(</span>");
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
                    this.isFormValid();
                }.bind(this));
            }
            
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
