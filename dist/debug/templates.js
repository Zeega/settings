this["JST"] = this["JST"] || {};

this["JST"]["app/templates/layout-main.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-content-wrapper"></div>';
}
return __p;
};

this["JST"]["app/pages/settings/settings.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h1>Settings</h1>\n\n<div class="content-wrapper">\n\n    <form>\n        <fieldset>\n\n            <label>Username <span class="username-validation"></span></label>\n            <input id="username" type="text" placeholder="Username" value="'+
( username )+
'">\n            <span class="help-block">http://zeega.com/@<span class="username-preview">'+
( username )+
'</span></span>\n\n            <label>Display Name</label>\n            <input id="display-name" type="text" placeholder="Display Name" value="'+
( display_name )+
'">\n            <span class="help-block">The name that will appear next to your Zeegas.</span>\n\n            <div class="half-width">\n                <label>Email Address</label>\n                <input id="email" type="email" placeholder="Email Address" value="'+
( email )+
'">\n            </div>\n\n            <div class="half-width">\n                <label>New Password</label>\n                <input id="password" type="password" placeholder="Password" >\n            </div>\n                <label>Notifications</label>\n                <span class="alert-type">Let me know when:</span><br>\n\n                <input type="checkbox" id="favorite-alert" ';
 if (notifications.email_on_favorite) { 
;__p+='checked';
 }
;__p+=' />\n                <span class="alert-type">My Zeegas are favorited.</span><br>\n\n                <input type="checkbox" id="feature-alert" ';
 if (notifications.email_on_feature) { 
;__p+='checked';
 }
;__p+=' />\n                <span class="alert-type">My Zeegas are chosen as the Zeega of the Day.</span><br>\n\n                <input type="checkbox" id="popular-alert" ';
 if (notifications.email_on_popular) { 
;__p+='checked';
 }
;__p+=' />\n                <span class="alert-type">My Zeegas are blowing up!</span><br>\n\n\n            <a href="#" class="btnz btnz-disabled settings-submit">Save Updates</a>\n        \n        </fieldset>\n    </form>\n\n</div>';
}
return __p;
};