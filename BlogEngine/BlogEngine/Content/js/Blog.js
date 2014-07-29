﻿define(["require", "exports", "AjaxHandler"], function(require, exports, AjaxHandler) {
    var Blog = (function () {
        function Blog() {
            this.Destination = $(".content-destination");
            this.Handler = new AjaxHandler();
            this.SetUpRoutes();
        }
        Blog.prototype.SetUpRoutes = function () {
            var _this = this;
            var app = Sammy(".wrapper");
            app.get('/', function () {
                _this.LoadInitialPosts();
            });

            app.get("/#Post/:PostName", function (ctx) {
                _this.LoadPost(ctx.params.PostName);
            });
            app.run('/#');
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
