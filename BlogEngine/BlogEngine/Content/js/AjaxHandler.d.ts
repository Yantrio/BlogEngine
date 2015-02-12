declare class AjaxHandler {
    AjaxCall(url: string, contentType: string, ajaxType: string, Done: (request: XMLHttpRequest) => void): void;
}
export = AjaxHandler;
