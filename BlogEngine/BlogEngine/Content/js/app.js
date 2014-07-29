define(["require", "exports", "Blog"], function(require, exports, blogHandler) {
    require(["nprogress", "jquery", "sammy"], function () {
        // code from window.onload
        var blog = new blogHandler();
        blog.LoadInitialPosts();
    });
});
//# sourceMappingURL=app.js.map
