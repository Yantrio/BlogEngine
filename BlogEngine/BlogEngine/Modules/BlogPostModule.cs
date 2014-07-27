﻿using BlogEngine.Models;
using Nancy;
using System;
using System.IO;
using System.Linq;

namespace BlogEngine.Modules
{
  public class BlogPostModule : NancyModule
  {
    public BlogPostModule(IPostParser parser, IRootPathProvider provider)
      : base("/Posts")
    {
      Get["/{start:int}/{finish:int}"] = args =>
      {
        var path = Path.Combine(provider.GetRootPath(), "Content\\Posts");

        var files = Directory.GetFiles(path).Select(filename =>
        {
          return parser.Parse(Path.GetFileNameWithoutExtension(filename));
        });

        var start = (int)args.start;
        var end = Math.Max((int)args.finish,files.Count());

        var filesWanted = files.Skip(start).Take(end - start).ToList();

        return View["BlogPosts", filesWanted];

      };

      Get["/{PostName}"] = args =>
      {
        var model = parser.Parse(args.PostName);
        return Negotiate.WithModel(new { model }).WithView("Post");
      };

    }


  }
}