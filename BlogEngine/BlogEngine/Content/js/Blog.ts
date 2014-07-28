module Blog {
    export class Blog {
        public Destination: JQuery;
        public constructor() {
            this.Destination = $(".content-destination");
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
            $.ajax({ url: "/Posts/0/10" }).done((data) => {
                this.Destination.empty();
                this.Destination.append(data);
            });
        }

        public LoadPost(name: string): void {
            $.ajax({ url: "/Posts/" + name }).done((data) => {
                this.Destination.empty();
                this.Destination.append(data);
            });
        }
    }
}

$(() => {
    var handler = new Blog.Blog();
});