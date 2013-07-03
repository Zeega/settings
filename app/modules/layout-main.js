 define([
    "app",
    "modules/settings",
    "backbone"
],

function( app, Settings ) {

    return Backbone.Layout.extend({
        el: "#main",
        template: "layout-main",

        beforeRender: function(){
            this.insertView( ".ZEEGA-content-wrapper", new Settings() );
        }
    });

});
