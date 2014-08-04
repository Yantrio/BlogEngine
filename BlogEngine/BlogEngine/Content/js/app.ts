import AjaxHandler = require("AjaxHandler");
import Page = require("page");

var Handler: AjaxHandler = new AjaxHandler();
var destination = document.getElementById("content-destination");

Page("/", (ctx) => {

    //get header
    
    Handler.AjaxCall("/Posts/0/10", 'POST', (data) => {
        destination.innerHTML = data.response;
    });
});
Page("/Posts/:PostName", (ctx) => {
    Handler.AjaxCall("/Posts/" + ctx.params.PostName, 'POST', (data) => {
        destination.innerHTML = data.response;
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