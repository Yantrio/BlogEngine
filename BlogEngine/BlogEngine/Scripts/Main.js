var Blog;
(function (Blog) {
    var PostService = (function () {
        function PostService() {
        }
        PostService.prototype.LoadPosts = function (start, end) {
            $.ajax({
                url: "/posts/" + start + "/" + end,
                accepts: "text/html"
            }).done(function (data) {
                var temp = data;
                $(".container").append(temp);
            });
        };
        return PostService;
    })();
    Blog.PostService = PostService;

    $(function () {
        var service = new PostService();
        service.LoadPosts(0, 1);
    });
})(Blog || (Blog = {}));
//# sourceMappingURL=Main.js.map
