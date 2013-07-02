this["JST"] = this["JST"] || {};

this["JST"]["app/templates/feed.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>'+
( headline )+
' &darr;</h2>';
}
return __p;
};

this["JST"]["app/templates/footer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n    <span class="tags">\n        <h1>Explore more Zeegas...  <br>\n            <a class="tag-link" data-bypass="true" href="'+
(path )+
'tag/bestof" >#bestof</a>\n            <a class="tag-link" data-bypass="true" href="'+
(path )+
'tag/stories" >#stories</a>\n            <a class="tag-link" data-bypass="true" href="'+
(path )+
'tag/funny" >#funny</a>\n            <a class="tag-link" data-bypass="true" href="'+
(path )+
'tag/music" >#music</a>\n        </h1>\n    </span>\n    ';
 if (userId == -1 ){ 
;__p+='\n        <span >\n            <h1>\n                <a class="btnz join-zeega" href="'+
(path )+
'register" >Join Zeega</a>\n            </h1>\n        </span>   \n    ';
 } 
;__p+='';
}
return __p;
};

this["JST"]["app/templates/home-cover.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="cover homepage" >\n    <span class="tagline">\n      <h2>Make the web you want</h2>\n    </span>\n</div>';
}
return __p;
};

this["JST"]["app/templates/layout-main.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="cover-wrapper"></div>\n<div class="ZEEGA-content-wrapper">\n    <div class="sidebar-wrapper"></div>\n    <div class="content"></div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/profile-cover.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="cover" \n    ';
 if ( background_image_url != "") { 
;__p+='\n        style ="background-image:url('+
( background_image_url )+
')" \n    ';
 } 
;__p+='\n>\n    <div class="profile-token-large" \n        ';
 if ( thumbnail_url !="") { 
;__p+='\n        style="background-image:url('+
( thumbnail_url )+
')"\n        ';
 } 
;__p+='\n    ></div>\n\n    <span class="headline">\n        <h2 class="display-name">'+
( display_name )+
'</h2>\n        <p class="bio">'+
( bio )+
'</p>\n    </span>\n\n    ';
 if ( editable ) { 
;__p+='\n        <div class="edit-bio-wrapper">\n            <a href="#" class="edit-bio btnz btnz-light">edit profile</a>\n            <a href="#" class="save-bio btnz btnz-green">save</a>\n        </div>\n    ';
 } 
;__p+='\n\n</div>\n\n';
 if ( editable ) { 
;__p+='\n    <div class="profile-image-inputs">\n        <i class="icon-chevron-left"></i> Profile Image <input type="file" class="profile-image" name="profile-image" size="chars">\n        <i class="icon-chevron-up"></i> Background Image <input type="file" class="background-image" name="background-image" size="chars"> \n    </div>\n';
 } 
;__p+='\n';
}
return __p;
};

this["JST"]["app/templates/sidebar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="about" />\n    \n    <div class="logo-wrapper"><span class="logo-mini"></span></div>\n    <div>\n        <h2>is a new form of interactive media. <a class="about-link" href="http://blog.zeega.com/about">Learn more.</a> <h2>\n        <br>\n        ';
 if (userId == -1 ){ 
;__p+='\n        <a class="btnz join-zeega" href="'+
(path )+
'register" > Sign Up</a>\n\n        ';
 } 
;__p+='\n    </div>\n\n</div>\n\n<div class="explore">\n    <h2>\n        Explore:\n        <a data-bypass="true" href="'+
(path )+
'tag/bestof" class="tag-link" name="bestof">#bestof</a>\n        <a data-bypass="true" href="'+
(path )+
'tag/stories" class="tag-link" name="stories">#stories</a>\n        <a data-bypass="true" href="'+
(path )+
'tag/funny" class="tag-link" name="funny">#funny</a>\n        <a data-bypass="true" href="'+
(path )+
'tag/music" class="tag-link" name="music">#music</a>\n    </h2>\n</div>';
}
return __p;
};

this["JST"]["app/templates/zeega-viewer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<iframe \n    id="viewer-iframe"\n    src="'+
(path )+
'" \n    endPage="true" \n    hideChrome="true" \n    webkitAllowFullScreen \n    mozallowfullscreen \n    allowFullScreen\n></iframe>\n<div class="modal-close">×</div>';
}
return __p;
};

this["JST"]["app/templates/zeega.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 if( cover_image != "" ) { 
;__p+='\n\n<article class="card" style="background-image: url('+
(cover_image )+
');" >\n\n';
 } else { 
;__p+='\n\n<article class="card" >\n\n';
 } 
;__p+='\n  <div class="info-overlay">\n    <div class="left-column">\n      <a data-bypass="true" class="profile-link" href="'+
(path )+
'profile/'+
(user.id )+
'" >\n        <div class="profile-token" style="background-image: url('+
( user.thumbnail_url )+
');"></div>\n       </a>\n    </div>\n    <div class="right-column">\n      <h1 class = "caption">'+
( title )+
'</h1>\n      \n      <div class="profile-name">\n        <a data-bypass="true" class="profile-link" href="'+
(path )+
'profile/'+
(user.id)+
'" >\n          '+
(user.display_name)+
'\n        </a>\n      </div>\n    </div>\n  </div>\n  <a href="'+
(path )+
''+
(id )+
'" class="play" data-bypass="true"></a>\n</article>\n\n';
 if ( editable ) { 
;__p+='\n  <div class="edit-actions">\n    <a href="/editor/'+
( id )+
'" class="edit-zeega btnz btnz-light" data-bypass="true" >edit</a>\n    <a href="#" class="delete-zeega btnz btnz-light">delete</a>\n  </div>\n';
 } 
;__p+='';
}
return __p;
};