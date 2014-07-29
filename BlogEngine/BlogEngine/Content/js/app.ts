/// <reference path="typings/jquery/jquery.d.ts" />
import ajaxHandler = require("AjaxHandler");
import blogHandler = require("Blog");

require(["nprogress", "jquery", "sammy"], () => {
    // code from window.onload
    var blog = new blogHandler();
    blog.LoadInitialPosts();
});