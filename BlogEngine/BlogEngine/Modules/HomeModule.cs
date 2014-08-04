using Nancy;
using Nancy.Responses.Negotiation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlogEngine.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            Get["/"] = _ => GoHome();
            Get["/{route}"] = _ => GoHome(_.route);
            Get["/Post/{route}"] = _ => GoHome(_.route);
        }

        public Negotiator GoHome(string route = null)
        {
            return View["Index",route];
        }
    }
}