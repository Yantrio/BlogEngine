define(["require", "exports", "Blog"], function(require, exports, blogHandler) {
    requirejs.config({
        appDir: ".",
        paths: {
            'jquery': ['//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min'],
            'bootstrap': ['//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min'],
            'sammy': ['//cdnjs.cloudflare.com/ajax/libs/sammy.js/0.7.4/sammy.min'],
            'nprogress': ['//cdnjs.cloudflare.com/ajax/libs/nprogress/0.1.3/nprogress.min']
        },
        shim: {
            /* Set bootstrap dependencies (just jQuery) */
            'bootstrap': ['jquery'],
            'nprogress': ['jquery'],
            'Blog': ['jquery', 'sammy']
        }
    });

    require(["nprogress", "jquery", "sammy"], function () {
        // code from window.onload
        var blog = new blogHandler();
        blog.LoadInitialPosts();
    });
});
//# sourceMappingURL=AppConfig.js.map
