define([
    "app",
    "backbone"
],

function( app ) {


    // TODO

    // validate email address

    return Backbone.View.extend({

        template: "settings",
        className: "settings",
        valid: true,
        isValidating: false,
        
        serialize: function() {

            return  _.extend({},
                app.metadata,
                this.model.toJSON(),
                {
                    path: "http:" + app.metadata.hostname + app.metadata.directory
                }
            );
        },

        events: {
            "click .settings-submit": "settingsSubmit",
            "focus #username": "onUsernameFocus",
            "blur #username": "validateUsername",
            "keydown #username": "onUsernameKeydown"
        },

        onUsernameKeydown: function( e ) {
            var charCode = e.which;

            return !(charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122));
        },

        onUsernameFocus: function() {
            this.valid = false;
            console.log("username focus", this.valid);
        },

        validateUsername: function() {
            this.isValidating = true;

            // broken in prod because of XDomain issues - 401
            $.post("http://staging.zeega.com/api/users/validate",{ username: this.$("#username").val() }, function(data) {
                this.valid = data.valid;
                if ( data.valid ) {
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
            });
            
        },

        settingsSubmit: function() {
            console.log("password", this.$("#password").val());
            if ( this.isValidating ) {
                this.model.once("validated", this.settingsSubmit, this);
            } else if ( this.valid ) {
                console.log('submit');
                this.model.set({
                    display_name: this.$("#display-name").val(),
                    username: this.$("#username").val(),
                    email: this.$("#email").val(),
                    password: this.$("#password").val()
                });
            }
        }

    });


});
