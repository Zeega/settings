 define([
    "app",
    "pages/settings/settings",
    "pages/social-registration/social",
    "backbone"
],

function( app, Settings, Social ) {

    return Backbone.Layout.extend({
        el: "#main",
        template: "templates/layout-main",

        beforeRender: function(){

            if ( app.page == "settings") {
                this.insertView( ".ZEEGA-content-wrapper", new Settings({ model: app.user }) );
            } else if ( app.page == "social") {
                new Social();
            }
        }
    });

});
