define(["require", "exports", "./AjaxHandler", "./page"], function(require, exports, AjaxHandler, Page) {
    var Blog = (function () {
        function Blog() {
            this.Destination = $(".content-destination");
            this.Handler = new AjaxHandler();
            this.SetUpRoutes();
        }
        Blog.prototype.SetUpRoutes = function () {
            Page('*', function (ctx) {
                var url = ctx.url;
            });
            Page.start();
        };

        Blog.prototype.LoadInitialPosts = function () {
            var _this = this;
            this.Handler.AjaxCall("/Posts/0/10", 'GET').done(function (data) {
                _this.Destination.empty();
                _this.Destination.append(data);
            });
        };

        Blog.prototype.LoadPost = function (name) {
            var _this = this;
            this.Handler.AjaxCall("/Posts/" + name, 'GET').done(function (data) {
                _this.Destination.empty();
                _this.Destination.append(data);
            });
        };
        return Blog;
    })();

    
    return Blog;
});
//# sourceMappingURL=Blog.js.map
