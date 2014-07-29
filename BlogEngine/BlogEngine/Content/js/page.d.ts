interface Page {
    (path: string, ctx: any);
    start() : void;
}

interface Context {
    save;
    canonicalPath;
    path;
    querystring;
    pathname;
    state;
    title;
}

declare var page: Page;

declare module "page" {
    export = page;
}