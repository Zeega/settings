define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({

        template: "settings",
        className: "settings",
        
        serialize: function() {
            return  _.extend({},
                app.metadata,
                {
                    path: "http:" + app.metadata.hostname + app.metadata.directory
                }
            );
        },

        events: {
            // "click .join-zeega": "onSignUp"
        }

    });


});
