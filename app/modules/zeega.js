define([
    "app",
    "modules/zeega-viewer",
    "backbone"
],

function( app, ZeegaViewer ) {


    Zeega = {};
    
    Zeega.Item = Backbone.Model.extend({
        url: function(){
            return app.metadata.api + "projects/" + this.id;
        },
        initialize: function(){
            this.card = new Zeega.View({ model: this });
        }
    });

    Zeega.Collection = Backbone.Collection.extend({

        model: Zeega.Item,
        page: 1,
        tags: null,
        user: null,
        limit: 10,

        initialize: function( options ){
            _.extend( this, options );
        },
        
        url: function() {
            var url =  app.metadata.api + "projects/search?sort=date-updated-desc&limit=" + this.limit + "&page=" + this.page;
 
            if( this.tags !== "" && this.tags !== "realtime" ){
                url += "&tags=" + this.tags;
            }

            if( this.profileId !== "" ){
                url += "&user=" + this.profileId;
            }

            return url;
        },

        parse: function( response ) {
            if( response.projects.length == this.limit ){
                this.more = true;
            } else {
                this.more = false;
                $(".footer").show();
            }
            return response.projects;
        }

    });

    Zeega.View = Backbone.Layout.extend({

        template: "zeega",
        className: "zeega-card",
        
        serialize: function() {
            return _.extend({
                    path: "http:" + app.metadata.hostname + app.metadata.directory
                },
                this.model.toJSON()
            );
        },

        events:{
            "click article":"onPlay",
            "click .delete-zeega": "deleteZeega"
        },

        onPlay: function( e ){
            if( e.target.className != "profile-link" && e.target.className != "profile-token"){
                var zeegaViewer = new ZeegaViewer({ model: this.model });

                $("body").append(zeegaViewer.render().view.el);

                //window.history.pushState("", this.model.get("title"), "/" + app.metadata.directory + this.model.id );



                return false;
            }

        },

        deleteZeega: function() {
            if (confirm("Delete your Zeega?")) {
                this.$el.slideUp(function() {
                    this.remove();
                    this.model.destroy();
                }.bind(this));
            }

            return false;
        }
    });


    // Required, return the module for AMD compliance
    return Zeega;

});
