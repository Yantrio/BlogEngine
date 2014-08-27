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
using Nancy.Bootstrapper;
using Nancy.Diagnostics;

namespace BlogEngine
{
  public class Bootstrapper : DefaultNancyBootstrapper
  {
    protected override void ApplicationStartup(TinyIoCContainer container, Nancy.Bootstrapper.IPipelines pipelines)
    {
      base.ApplicationStartup(container, pipelines);
      StaticConfiguration.EnableRequestTracing = true;

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
      nancyConventions.StaticContentsConventions.AddDirectory("/_Nancy/Resources");
      base.ConfigureConventions(nancyConventions);
    }

    protected override void RequestStartup(TinyIoCContainer container, IPipelines pipelines, NancyContext context)
    {

      //CORS Enable
      pipelines.AfterRequest.AddItemToEndOfPipeline((ctx) =>
      {
        ctx.Response.WithHeader("Access-Control-Allow-Origin", "*")
                        .WithHeader("Access-Control-Allow-Methods", "POST,GET")
                        .WithHeader("Access-Control-Allow-Headers", "Accept, Origin, Content-type");

      });
    }

    protected override DiagnosticsConfiguration DiagnosticsConfiguration
    {
      get { return new DiagnosticsConfiguration { Password = @"password" }; }
    }
  }
}