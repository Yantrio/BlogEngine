using Kiwi.Markdown;
using Kiwi.Markdown.ContentProviders;
using Nancy;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Nancy.Conventions;

namespace BlogEngine
{
  public class Bootstrapper : DefaultNancyBootstrapper
  {
    protected override void ConfigureApplicationContainer(Nancy.TinyIoc.TinyIoCContainer container)
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