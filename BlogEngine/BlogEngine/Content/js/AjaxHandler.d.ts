declare class AjaxHandler {
    public AjaxCall(url: string, ajaxType: string, Done: (request: XMLHttpRequest) => void): void;
}
export = AjaxHandler;
