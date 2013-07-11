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

        isEmailValid: function() {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            return re.test( this.$("#form_email").val() );
        },

        isUsernameValid: function() {
            var reason,
                val = this.$("#zeega_user_registration_social_username").val(),
                minLength = val.length > 2,
                omitsZeega = this.omits( val, "zeega"),
                omitsAdmin = this.omits( val, "admin");
                
            return {
                valid: minLength && omitsZeega && omitsAdmin && this.valid,
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

        isFormValid: function() {

            if ( this.isUsernameValid().valid && this.isEmailValid() ) {
                this.$(".submit").removeClass("btnz-disabled");
            } else {
                this.$(".submit").addClass("btnz-disabled");
            }
        },

        events: {
            "click .submit": "settingsSubmit",
            "keyup #zeega_user_registration_social_username": "onUsernameKeydown",
            "paste #zeega_user_registration_social_username": "onPaste",
            "keyup input": "onAnyInput"
        },

        onAnyInput: function() {
            $(".submit")
                .text("Save Updates").removeClass("btnz-flat");

            this.isFormValid();
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

            this.valid = false;
            $(".username-validation").empty();
            
            if ( isOkay ) {
                $(".username-preview").text( $("#zeega_user_registration_social_username").val());
            }

            this.lazyValidate( this );
            this.disableSubmit();

            return isOkay;
        },

        lazyValidate: _.debounce(function( ctx ) {
            ctx.validateUsername();
        }.bind(this), 1000 ),

        validateUsername: function() {
            this.isValidating = true;

            if ( this.$("#zeega_user_registration_social_username").val().length < 3 ) {
                this.$(".username-validation").html("— <span class='invalid'>Your username must be at least 3 characters</span>");
                $("#zeega_user_registration_social_username").addClass("error");
            } else {

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
            }
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
