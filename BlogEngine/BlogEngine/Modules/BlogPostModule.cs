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
            Post["/{start:int}/{finish:int}"] = args =>
              {
                  var path = Path.Combine(provider.GetRootPath(), "Content\\Posts");

                  var files = Directory.GetFiles(path).Select(filename =>
                  {
                      return parser.Parse(Path.GetFileNameWithoutExtension(filename));
                  });

                  var start = (int)args.start;
                  var end = Math.Max((int)args.finish, files.Count());

                  var filesWanted = files.Skip(start).Take(end - start).ToList();

                  return View["BlogPosts", filesWanted];
              };

            Post["/{PostName}"] = args =>
            {
                var model = parser.Parse(args.PostName);
                return View["FullPost", model];
            };

            Get["/{path}"] = args =>
            {
                return View["Views/Index.cshtml", (string)args.path];
            };
        }
    }
}