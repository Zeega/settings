this["JST"] = this["JST"] || {};

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

this["JST"]["app/templates/layout-main.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-content-wrapper"></div>';
}
return __p;
};

this["JST"]["app/templates/settings.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h1>Settings</h1>\n\n<div class="content-wrapper">\n\n    <form>\n        <fieldset>\n            <label>Display Name</label>\n            <input id="display-name" type="text" placeholder="Display Name" value="'+
( display_name )+
'">\n            <span class="help-block">The name that will appear next to your Zeegas.</span>\n\n            <label>Username <span class="username-validation"></span></label>\n            <input id="username" type="text" placeholder="Username" value="'+
( username )+
'">\n            <span class="help-block">http://zeega.com/@<span class="username-preview">'+
( username )+
'</span> — Letters and numbers only!</span>\n\n            <div class="half-width">\n                <label>Email Address</label>\n                <input id="email" type="email" placeholder="Email Address" value="'+
( email )+
'">\n            </div>\n\n            <div class="half-width">\n                <label>Password</label>\n                <input id="password" type="password" placeholder="Password" >\n            </div>\n            \n            <a href="#" class="btnz btnz-disabled settings-submit">Save Updates</a>\n        \n        </fieldset>\n    </form>\n\n</div>';
}
return __p;
};