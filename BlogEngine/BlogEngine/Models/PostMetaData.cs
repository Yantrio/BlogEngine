using System;
using System.Collections.Generic;

namespace BlogEngine.Models
{
  public class PostMetaData
  {
    public string Title { get; set; }
    public DateTime CreatedDate { get; set; }
    public string Author { get; set; }
    public IEnumerable<string> Categories { get; set; }
  }
}