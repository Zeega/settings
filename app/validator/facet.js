define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.Model.extend({
        
        validate: null,

        defaults: {
            type: "plaintext", // email, password
            contains: null, // csv
            omits: null, // csv
            minLength: 0,
            maxLength: null,
            vigilant: true,
            required: true,

            $el: null,
            valid: null,
            _flash: null,
        },

        initialize: function() {

            this.valid = false;

            if ( this.get("vigilant") ) {
                this.get("$el").bind("keyup.facet-" + this.cid, function(e) {
                    this.onKeyup( e );
                }.bind( this ));
                this.get("$el").bind("keydown.facet-" + this.cid, function(e) {
                    this.onKeydown( e );
                }.bind( this ));
            }

            switch( this.get("type") ) {
                case "email":
                    this.validate = this.email;
                    break;
                case "username":
                    this.validate = this.username;
                    break;
                default:
                    this.validate = this.plaintext;
            }

            this.on("change:valid", this.onValidChange, this );
        },

        email: function( value ) {
            var isEmail = this.conformsTo(
                    this.get("$el").val(),
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );

            this.set({
                valid: isEmail,
                _flash: isEmail ? null : "Invalid Email Address"

            });
            this.updateEl( isEmail );

            this.trigger("validated");

            return isEmail;
        },

        plaintext: function( value ) {
            var contains = true,
                omits = true,
                minlength = true,
                maxlength = true,
                value = this.get("$el").val(),
                flash,
                validation;

            // contains
            if ( this.get("contains") ) {
                
            }
            // omits
            if ( this.get("omits") ) {
                omits = this.omits( value, this.get("omits") );
                flash = "Cannot contain the words: " + this.get("omits").replace(",", " or ");
            }
            // minlength
            if ( this.get("minLength") ) {
                minlength = this.isMinLength( value, this.get("minLength") );
                flash = minlength ? null : "Must be at least " + this.get("minLength") + " characters"
            }
            // maxlength
            if ( this.get("maxLength") ) minlength = this.isMaxLength( value, this.get("maxLength") );


            if ( !this.get("required") && value.length === 0 ) {
                this.set("valid", true );
            } else {
                this.set({
                    valid: omits && minlength && maxlength,
                    _flash: flash
                });
            }

            this.updateEl( this.get("valid") );

            if ( this.get("type") !== "username" ) {
                this.trigger("validated");
            }

            return this.get("valid");
        },

        username: function( value ) {
            var usernameValid, validString = this.plaintext();
            
            if ( validString ) {
                this.checkUsername( this.get("$el").val(), this );
            } else return false;
        },

        checkUsername: _.debounce(function( value, ctx ) {

            $.get( app.metadata.api + "users/validate/" + value, function( data ) {
                
                ctx.valid = data.valid;
                if ( data.valid ) {

                } else {

                }

                ctx.trigger("validated", {
                    valid: data.valid,
                    flash: ""
                });

            }.bind(ctx))
            .fail(function( e ) {

            }.bind(ctx))
            .always(function() {

            }.bind(ctx));
        }, 750 ),


        updateEl: function( isValid ) {
            if ( isValid ) {
                this.get("$el").removeClass("input-error");
            } else {
                this.get("$el").addClass("input-error");
            }
        },

        onKeyup: function( e ) {
            this.validate( e );
        },

        onKeydown: function( e ) {
            this.valid = false;
        },

        conformsTo: function( value, regexp ) {

            return regexp.test( value );
        },

        contains: function() {

        },

        omits: function( value, omitString ) {
            var truthArray = _.map( omitArray = omitString.split(","), function( badWord ) {
                var regexp = new RegExp( badWord, "gi" );

                return value.match(regexp) === null;
            });

            return !_.contains( truthArray, false );
        },

        isMinLength: function( value, min ) {
            return value.length >= min;
        },

        isMaxLength: function( value, max ) {
            return value.length <= max;
        },

        onValidChange: function() {
            if ( this.get("valid") ) this.onValid();
            else this.onInvalid();
        },

        onValid: function() {
            $(".flash-" + this.cid ).remove();
            if ( this.get("_flash") ) {
                this.get("$el").after("<div class='flash flash-" + this.cid + " form-valid-message'>" + this.get("_flash") + "</div>");
            }
        },

        onInvalid: function() {
            $(".flash-" + this.cid ).remove();
            if ( this.get("_flash") ) {
                this.get("$el").after("<div class='flash flash-" + this.cid + " form-error-message'>" + this.get("_flash") + "</div>");
            }
        },

        isValid: function() {
            return this.valid;
        }

    });

});