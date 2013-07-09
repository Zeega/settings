define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.Model.extend({
        
        defaults: {
            background_image_url: "",
            bio: "",
            created_at: null,
            display_name: "",
            editable: false,
            id: null,
            location: null,
            locationLatitude: null,
            locationLongitude: null,
            thumbnail_url: "",

            username: "yourname",
            email: "tester@test.com"
        },

        url: function() {
            return app.metadata.api + "users/" + this.id;
        },

        initialize: function() {
            if ( window.profileData ) this.set( $.parseJSON( profileData ));
        }

    });

});
