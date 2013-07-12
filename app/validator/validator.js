define([
    "validator/facet.collection",
    "backbone"
],

function( FacetCollection ) {

    return Backbone.Model.extend({
        
        facets: null,

        initialize: function() {
            this.facets = new FacetCollection( this.get("facets") );

            if ( this.facets.length ) {
                this.listen();
            }
        },

        listen: function() {
            this.facets.on("validated", this.onValidated, this);
        },

        onValidated: function( validation ) {

            this.trigger("validated", {
                valid: this.facets.isValid(),
                flash: ""
            });
        }

    });

});
