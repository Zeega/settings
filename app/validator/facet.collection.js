define([
    "validator/facet",
    "backbone"
],

function( Facet ) {

    return Backbone.Collection.extend({
        
        model: Facet,

        isValid: function() {
            return !_.contains( this.pluck("valid"), false );
        },

        getValid: function() {

        },

        getInvalid: function() {

        }

    });

});
