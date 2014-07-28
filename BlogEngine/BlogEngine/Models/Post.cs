using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlogEngine.Models
{
  public class Post
  {

    public string PostName { get; set; }
    public PostMetaData MetaData { get; set; }
    public string BodyAsHtml { get; set; }
    public string ExcerptAsHtml { get; set; }
  }
}