define(["require", "exports", "AjaxHandler", "page"], function (require, exports, AjaxHandler, Page) {
    function ReloadDisqus(url) {
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.url = url;
            }
        });
    }
    ;
    function ReloadDisqusCommentCount() {
        DISQUSWIDGETS = undefined;
        $.getScript("http://yantrio.disqus.com/count.js");
    }
    var Handler = new AjaxHandler();
    var destination = document.getElementById("content-destination");
    Page("/", function (ctx) {
        Handler.AjaxCall("/Posts/0/10", 'text/html', 'POST', function (response) {
            destination.innerHTML = response.response;
            document.title = "Yantr.io";
            ReloadDisqusCommentCount();
        });
    });
    Page("/Posts/:PostName", function (ctx) {
        Handler.AjaxCall("/Posts/" + ctx.params.PostName, 'text/html', 'POST', function (response) {
            destination.innerHTML = response.response;
            document.title = response.getResponseHeader("blog-title");
            ReloadDisqus(window.location.href);
        });
    });
    Page("*", function (ctx) {
        location.href = "/";
    });
    Page.start({
        click: true,
        popstate: true,
        dispatch: true
    });
});
//# sourceMappingURL=app.js.map