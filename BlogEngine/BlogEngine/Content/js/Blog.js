var Blog;
(function (_Blog) {
    var Blog = (function () {
        function Blog() {
            this.Destination = $(".content-destination");
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
            $.ajax({ url: "/Posts/0/10" }).done(function (data) {
                _this.Destination.empty();
                _this.Destination.append(data);
            });
        };

        Blog.prototype.LoadPost = function (name) {
            var _this = this;
            $.ajax({ url: "/Posts/" + name }).done(function (data) {
                _this.Destination.empty();
                _this.Destination.append(data);
            });
        };
        return Blog;
    })();
    _Blog.Blog = Blog;
})(Blog || (Blog = {}));

$(function () {
    var handler = new Blog.Blog();
});
//# sourceMappingURL=Blog.js.map
