using BlogEngine.Models;
using Nancy;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace BlogEngine.Services
{
    public class PostProvider
    {
        private Dictionary<string, Post> postCache;
        private readonly IPostParser postParser;
        private readonly IRootPathProvider rootPathProvider; 

        public PostProvider(IPostParser postParser, IRootPathProvider rootPathProvider)
        {
            postCache = new Dictionary<string, Post>();
            this.postParser = postParser;
            this.rootPathProvider = rootPathProvider;
        }

        public IEnumerable<Post> GetPosts(int start, int finish)
        {
            var path = Path.Combine(rootPathProvider.GetRootPath(), "Content\\Posts");

            var files = Directory.GetFiles(path).Select(filename =>
            {
                return GetPost(Path.GetFileNameWithoutExtension(filename));
            });

            var end = Math.Max(finish, files.Count());
            var filesWanted = files.Skip(start).Take(end - start).ToList();
            return files.Skip(start).Take(end - start).ToList();
        }

        public Post GetPost(string postName)
        {
            if (postCache.ContainsKey(postName))
            {
                return postCache[postName];
            }
            else
            {
                Post post = postParser.Parse(postName);
                postCache[postName] = post;
                return post;
            }
        }
    }
}