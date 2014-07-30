interface IPage {
    (url: string, callback: (ctx: IContext) => void);
    base(baseUrl: string);
    start(settings?: IPageSettings);
    stop();
    show(url: string);
}

interface IPageSettings {
    click: boolean;
    popstate: boolean;
    dispatch: boolean;
}

interface IContext {
    save();
    canonicalPath: string;
    path: string;
    querystring: string;
    pathname: string;
    state: any;
    title: string;
    params: any;
}

declare var Page: IPage;

declare module "page" {
    export = Page;
}