using Kiwi.Markdown;
using Kiwi.Markdown.ContentProviders;
using Nancy;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Nancy.Conventions;
using Nancy.ErrorHandling;
using Nancy.TinyIoc;
using BlogEngine.Modules;
using Nancy.Responses;

namespace BlogEngine
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, Nancy.Bootstrapper.IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);
        }

        protected override void ConfigureApplicationContainer(TinyIoCContainer container)
        {
            var provider = new FileContentProvider(Path.Combine(RootPathProvider.GetRootPath(), "Content\\Posts"));

            container.Register<IContentProvider, FileContentProvider>(provider);
            container.Register<IMarkdownService, MarkdownService>().AsSingleton();
            container.Register<IPostParser, KiwiMarkdownPostParser>().AsSingleton();

            StaticConfiguration.DisableErrorTraces = false;
        }

        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            nancyConventions.StaticContentsConventions.AddDirectory("Scripts");
            nancyConventions.StaticContentsConventions.AddDirectory("Views/Templates");
            base.ConfigureConventions(nancyConventions);


        }
    }
}