define(["require", "exports", "AjaxHandler", "page"], function(require, exports, AjaxHandler, Page) {
    var Handler = new AjaxHandler();
    var destination = document.getElementById("content-destination");

    Page("/", function (ctx) {
        //get header
        Handler.AjaxCall("/Posts/0/10", 'POST', function (data) {
            destination.innerHTML = data.response;
        });
    });
    Page("/Posts/:PostName", function (ctx) {
        Handler.AjaxCall("/Posts/" + ctx.params.PostName, 'POST', function (data) {
            destination.innerHTML = data.response;
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
