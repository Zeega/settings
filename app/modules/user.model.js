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

        initialize: function() {
            this.set( $.parseJSON( profileData ));
        }

    });

});
