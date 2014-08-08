declare class AjaxHandler {
    public AjaxCall(url: string, contentType: string, ajaxType: string, Done: (request: XMLHttpRequest) => void): void;
}
export = AjaxHandler;
