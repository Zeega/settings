define([
    // Application.
    "app",

    // Modules.
    "modules/initializer"
],

function(app, Initializer) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes: {
            "": "index",
            "settings": "settings",
            "social": "social"
        },

        index: function() {
            app.page = "settings";
            this.init();
        },

        settings: function() {
            app.page = "settings";
            this.init();
        },

        social: function() {
            app.page = "social";
            this.init();
        },

        init: _.once(function() {
            $("body").addClass("page-" + app.page )
            new Initializer();
        })

    });

    return Router;

});
