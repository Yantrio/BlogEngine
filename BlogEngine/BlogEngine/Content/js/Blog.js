var Blog;
(function (_Blog) {
    var Blog = (function () {
        function Blog() {
            this.Destination = $(".content-destination");
        }
        Blog.prototype.LoadInitialPosts = function () {
            var _this = this;
            $.ajax({ url: "/Posts/0/10" }).done(function (data) {
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
    handler.LoadInitialPosts();
});
//# sourceMappingURL=Blog.js.map
