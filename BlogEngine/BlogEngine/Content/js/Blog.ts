module Blog {
    export class Blog {
        public Destination: JQuery;
        public constructor() {
            this.Destination = $(".content-destination");
        }

        public LoadInitialPosts() {
            $.ajax({ url: "/Posts/0/10" }).done((data) => {
                this.Destination.empty();
                this.Destination.append(data);
            });
        }
    }
}

$(() => {
    var handler = new Blog.Blog();
    handler.LoadInitialPosts();
});