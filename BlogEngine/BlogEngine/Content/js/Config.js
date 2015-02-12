require.config({
    deps: ["./app"],
    appDir: ".",
    baseUrl: "/Content/js/",
    paths: {
        'jquery': ['//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min'],
        'bootstrap': ['//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min'],
        'nprogress': ['//cdnjs.cloudflare.com/ajax/libs/nprogress/0.1.3/nprogress.min'],
        'page': ['./page']
    },
    shim: {
        /* Set bootstrap dependencies (just jQuery) */
        'bootstrap': ['jquery'],
        'nprogress': ['jquery'],
    }
});
//# sourceMappingURL=Config.js.map