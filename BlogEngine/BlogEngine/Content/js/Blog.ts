module Blog {
    export class Blog {
        public Destination: JQuery;

        public Handler: Ajax.AjaxHandler;
        public constructor() {
            this.Destination = $(".content-destination");
            this.Handler = new Ajax.AjaxHandler();
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
}

$(() => {
    var handler = new Blog.Blog();
});