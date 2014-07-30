define(["require", "exports", "./AjaxHandler"], function(require, exports, AjaxHandler) {
    var Blog = (function () {
        function Blog() {
            this.Destination = $(".content-destination");
            this.Handler = new AjaxHandler();
            this.SetUpRoutes();
        }
        return Blog;
    })();

    
    return Blog;
});
//# sourceMappingURL=Blog.js.map
