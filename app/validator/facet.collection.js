define([
    "validator/facet",
    "backbone"
],

function( Facet ) {

    return Backbone.Collection.extend({
        
        model: Facet,

        isValid: function() {
            // var facetsValid = this.pluck("valid");
            // var test = _.every( facetsValid, Boolean );
            //console.log("is valid:", this.pluck("valid"), test, _.isBoolean(test) );
            return _.every( this.pluck("valid"), Boolean );
        },

        getValid: function() {

        },

        getInvalid: function() {

        }

    });

});
