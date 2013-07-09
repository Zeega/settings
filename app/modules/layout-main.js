 define([
    "app",
    "pages/settings/settings",
    "backbone"
],

function( app, Settings ) {

    return Backbone.Layout.extend({
        el: "#main",
        template: "templates/layout-main",

        beforeRender: function(){
            this.insertView( ".ZEEGA-content-wrapper", new Settings({ model: app.user }) );
        }
    });

});
