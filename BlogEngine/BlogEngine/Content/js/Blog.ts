/// <reference path="page.d.ts" />
import AjaxHandler = require("./AjaxHandler");
import Page = require("./page");

class Blog {
    public Destination: JQuery;
    public Handler: AjaxHandler;
    public constructor() {
        this.Destination = $(".content-destination");
        this.Handler = new AjaxHandler();
        this.SetUpRoutes();
    }

    public SetUpRoutes(): void {
        Page('*', function (ctx) {
            var url = ctx.url;
        });
        Page.start();
    }

    public LoadInitialPosts(): void {
        this.Handler.AjaxCall("/Posts/0/10", 'GET').done((data) => {
            this.Destination.empty();
            this.Destination.append(data);
        });
    }

    public LoadPost(name: string): void {
        this.Handler.AjaxCall("/Posts/" + name, 'GET').done((data) => {
            this.Destination.empty();
            this.Destination.append(data);
        });
    }
}

export = Blog;
