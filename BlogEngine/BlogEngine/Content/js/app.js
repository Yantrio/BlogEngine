define(["require", "exports", "AjaxHandler", "page"], function(require, exports, AjaxHandler, Page) {
    var Handler = new AjaxHandler();
    var destination = document.getElementById("content-destination");

    Page("/", function (ctx) {
        Handler.AjaxCall("/Posts/0/10", 'GET', function (data) {
            destination.innerHTML = data.response;
        });
    });
    Page("/Post/:PostName", function (ctx) {
        Handler.AjaxCall("/Posts/" + ctx.params.PostName, 'GET', function (data) {
            destination.innerHTML = data.response;
        });
    });
    Page.start({
        click: true,
        popstate: true,
        dispatch: true
    });
});
//# sourceMappingURL=app.js.map
