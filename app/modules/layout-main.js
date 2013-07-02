 define([
    "app",
    "modules/sidebar",
    "modules/feed",
    "modules/cover",
    "modules/footer",
    "modules/zeega",
    "backbone"
],

function( app, SidebarView, FeedView, Cover, FooterView, Zeega ) {

    
    return Backbone.Layout.extend({

        el: "#main",
        template: "layout-main",

        beforeRender: function(){
            
            zeegas = new Zeega.Collection( app.metadata );
            
            if( _.isUndefined( window.profileData )){
                this.insertView( ".cover-wrapper", new Cover.HomeView() );
            } else {
                this.insertView( ".cover-wrapper", new Cover.ProfileView() );
            }
            
            

            this.insertView( ".sidebar-wrapper", new SidebarView() );
            this.insertView( ".content", new FeedView({ collection: zeegas }) );
            this.insertView( ".content", new FooterView() );
        }
    });

});
