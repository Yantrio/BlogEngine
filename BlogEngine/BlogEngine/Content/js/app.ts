import AjaxHandler = require("AjaxHandler");
import Page = require("page");

declare var DISQUS: any;

function ReloadDisqus(url : string): void {
    DISQUS.reset({
        reload: true,
        config: function () {
            this.page.url = url;
        }
    });
};
var Handler: AjaxHandler = new AjaxHandler();
var destination = document.getElementById("content-destination");

Page("/", (ctx) => {
    Handler.AjaxCall("/Posts/0/10",'text/html', 'POST', (response) => {
        destination.innerHTML = response.response;
        document.title = "Yantr.io";
    });
});
Page("/Posts/:PostName", (ctx) => {
    Handler.AjaxCall("/Posts/" + ctx.params.PostName, 'text/html',  'POST', (response) => {
        destination.innerHTML = response.response;
        document.title = response.getResponseHeader("blog-title");

        ReloadDisqus(window.location.href);
    });

});

Page("*", (ctx) => {
    location.href = "/";
});

Page.start({
    click: true,
    popstate: true,
    dispatch: true
});