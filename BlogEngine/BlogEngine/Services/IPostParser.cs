using BlogEngine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlogEngine.Services
{
    public interface IPostParser
    {
        Post Parse(string fileName);
    }
}