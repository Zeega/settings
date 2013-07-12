define([
    "validator/facet",
    "backbone"
],

function( Facet ) {

    return Backbone.Collection.extend({
        
        model: Facet,

        isValid: function() {
            // console.log("is valid:", this.pluck("valid"), _.every( this.pluck("valid"), Boolean ));
            return _.every( this.pluck("valid"), Boolean );
        },

        getValid: function() {

        },

        getInvalid: function() {

        }

    });

});
