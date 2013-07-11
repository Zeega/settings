define([
    "app",
    "backbone"
],

function( app ) {

    // TODO
    // validate email address

    return Backbone.View.extend({

        template: "pages/settings/settings",
        className: "settings",
        valid: true,
        isValidating: false,

        initialize: function() {
            console.log("init")
        },
        
        serialize: function() {

            return  _.extend({},
                app.metadata,
                this.model.toJSON(),
                {
                    path: "http:" + app.metadata.hostname + app.metadata.directory
                }
            );
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

        isFormValid: function() {

            if ( this.isUsernameValid().valid && this.isEmailValid() ) {
                this.$(".submit").removeClass("btnz-disabled");
            } else {
                this.$(".submit").addClass("btnz-disabled");
            }
        },

        events: {
            "click .settings-submit": "settingsSubmit",
            "blur #username": "validateUsername",
            "keydown #username": "onUsernameKeydown",
            "paste #username": "onPaste",
            "keyup input": "onAnyInput"
        },

        onAnyInput: function() {
            // $(".settings-submit")
            //     .text("Save Updates")
            //     .addClass("btnz-red")
            //     .removeClass("btnz-disabled btnz-success btnz-flat");
console.log('is vldi?')
            this.isFormValid();
        },

        onPaste: function() {
            $(".username-validation").empty();
            _.delay(function() {
                var pastedContent = $("#username").val(),
                    cleansedContent = pastedContent.replace(/[^a-z0-9]/gi,"");

                $("#username").val( cleansedContent );
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
                $(".username-preview").text( $("#username").val());
            }

            return isOkay;
        },

        validateUsername: function() {
            this.isValidating = true;

            // broken in prod because of XDomain issues - 401
            $.get( app.metadata.api + "users/validate/" + this.$("#username").val(), function(data) {
                this.valid = data.valid;
                if ( data.valid ) {
                    this.model.trigger("validated");
                    this.$(".username-validation").html("— <span class='valid'>ok!</span>");
                    $("#username").removeClass("error");
                } else {
                    this.$(".username-validation").html("— <span class='invalid'>That username has already been taken :(</span>");
                    $("#username").addClass("error");
                }
            }.bind(this))
            .fail(function( e ) {
                console.log("validation fail. Details:", e);
                this.$(".username-validation").html("— <span class='invalid'>Validation failed. Try again?</span>");
                $("#username").addClass("error");
                // this.valid = true; // rm this. invalid. for testing
            }.bind(this))
            .always(function() {
                this.isValidating = false;
            }.bind(this));
            
        },

        settingsSubmit: function() {

            $(".settings-submit").removeClass("btnz-red").addClass("btnz-disabled");
            if ( this.isValidating ) {
                this.model.once("validated", this.saveUserModel, this);
            } else if ( this.valid ) {
               this.saveUserModel();
            }
        },

        saveUserModel: function() {
            this.model.save({
                display_name: this.$("#display-name").val(),
                username: this.$("#username").val(),
                email: this.$("#email").val(),
                password: this.$("#password").val()
            });
            $(".settings-submit")
                .text("Updates Saved!")
                .addClass("btnz-success btnz-flat")
                .removeClass("btnz-disabled");
        }

    });


});
