module Blog {
    export class PostService {

        public LoadPosts(start: number, end: number) {
            $.ajax({
                url: "/posts/" + start + "/" + end,
                accepts: "text/html"
            }).done((data) => {
                    var temp = data;
                    $(".container").append(temp);
                });
        }
    }

    $(() => {
        var service = new PostService();
        service.LoadPosts(0, 1);
    });
}   