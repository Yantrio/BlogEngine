using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Extensions;
using Owin;
using Nancy;
using System.Collections.Generic;


using AppFunc = System.Func<System.Collections.Generic.IDictionary<string, object>, System.Threading.Tasks.Task>;


[assembly: OwinStartup(typeof(BlogEngine.Startup))]

namespace BlogEngine
{
  public class Startup
  {
    public void Configuration(IAppBuilder app)
    {

      app.UseNancy();
      app.UseStageMarker(PipelineStage.MapHandler);
    }
  }
}