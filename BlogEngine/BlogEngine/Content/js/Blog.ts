///<amd require
import AjaxHandler = require("AjaxHandler");

class Blog {
    public Destination: JQuery;
    public Handler: AjaxHandler;

    public constructor() {
        this.Destination = $(".content-destination");
        this.Handler = new AjaxHandler();
        this.SetUpRoutes();
    }

    public SetUpRoutes(): void {
        var app: Sammy.Application = Sammy(".wrapper");
        app.get('/', () => {
            this.LoadInitialPosts();
        });

        app.get("/#Post/:PostName", (ctx: Sammy.EventContext) => {
            this.LoadPost(ctx.params.PostName);
        });
        app.run('/#');
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
