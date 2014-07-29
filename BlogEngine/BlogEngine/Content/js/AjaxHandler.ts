module Ajax {

    export class AjaxHandler {

        public AjaxCall(url: string, ajaxType: string) {
            NProgress.start();
            return $.ajax({
                xhr: () => {
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", (evt) => {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            NProgress.set(percentComplete);
                        }
                    }, false);

                    xhr.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            //Do something with download progress
                            NProgress.set(percentComplete);
                        }
                    }, false);

                    return xhr;
                },
                type: ajaxType,
                url: url,
                data: {},
                success: function (data) {
                    NProgress.done();
                }
            });

        }
    }

} 