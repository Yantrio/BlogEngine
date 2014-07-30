import AjaxHandler = require("AjaxHandler");
import Page = require("page");

var Handler: AjaxHandler = new AjaxHandler();
var destination = document.getElementById("content-destination");

Page("/", (ctx) => {
    Handler.AjaxCall("/Posts/0/10", 'GET', (data) => {
        destination.innerHTML = data.response;
    });
});
Page("/Post/:PostName", (ctx) => {
    Handler.AjaxCall("/Posts/" + ctx.params.PostName, 'GET', (data) => {
        destination.innerHTML = data.response;
    });
});
Page.start({
    click: true,
    popstate: true,
    dispatch: true
});