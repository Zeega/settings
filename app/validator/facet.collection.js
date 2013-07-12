define([
    "validator/facet",
    "backbone"
],

function( Facet ) {

    return Backbone.Collection.extend({
        
        model: Facet,

        onSet: function() {
            console.log("onse se")
        },

        isValid: function() {
            return !_.contains( this.pluck("valid"), false )
        },

        getValid: function() {

        },

        getInvalid: function() {

        }

    });

});
