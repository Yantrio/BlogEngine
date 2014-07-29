define(["require", "exports"], function(require, exports) {
    var AjaxHandler = (function () {
        function AjaxHandler() {
        }
        AjaxHandler.prototype.AjaxCall = function (url, ajaxType) {
            NProgress.start();
            return $.ajax({
                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
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
        };
        return AjaxHandler;
    })();

    
    return AjaxHandler;
});
//# sourceMappingURL=AjaxHandler.js.map
