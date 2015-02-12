using BlogEngine.Models;
using Nancy;
using System;
using System.Xml.Linq;
using System.IO;
using System.Linq;
using BlogEngine.Services;
using System.Collections.Generic;

namespace BlogEngine.Modules
{
    public class BlogPostModule : NancyModule
    {
        public BlogPostModule(PostProvider provider)
            : base("/Posts")
        {
            Post["/{start:int}/{finish:int}"] = args =>
              {
                  IEnumerable<Post> posts = provider.GetPosts(args.start, args.finish);
                  return Negotiate.WithModel(posts).WithView("BlogPosts");
              };

            Post["/{PostName}"] = args =>
            {
                Post model = provider.GetPost(args.PostName);
                return Negotiate
                    .WithModel(model)
                    .WithView("FullPost")
                    .WithHeader("blog-title", model.MetaData.Title);
            };

            Get["/{path}"] = args =>
            {
                return View["Views/Index.cshtml", (string)args.path];
            };
        }
    }
}