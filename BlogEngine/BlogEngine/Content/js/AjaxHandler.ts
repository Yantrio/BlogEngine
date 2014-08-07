import NProgress = require("nprogress");

class AjaxHandler {
    public AjaxCall(url: string, contentType: string, ajaxType: string, Done: (request: XMLHttpRequest) => void){
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

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                
                NProgress.done();
                if (xhr.status == 200) {
                    if (Done) {
                        Done(xhr);
                    }
                }
            }
        }

        NProgress.start();
        xhr.open(ajaxType, url, true);
        xhr.setRequestHeader("Accept", contentType);
        xhr.send(null);
    }
}
export = AjaxHandler;