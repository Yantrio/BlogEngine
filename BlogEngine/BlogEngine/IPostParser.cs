using BlogEngine.Models;
using Kiwi.Markdown;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlogEngine
{
  public interface IPostParser
  {
    Post Parse(string fileName);
  }

  public class KiwiMarkdownPostParser : IPostParser
  {
    private readonly IMarkdownService markdownService;
    private readonly IContentProvider contentProvider;

    public KiwiMarkdownPostParser(IMarkdownService markdownService, IContentProvider contentProvider)
    {
      this.markdownService = markdownService;
      this.contentProvider = contentProvider;
    }

    public Post Parse(string fileName)
    {
      var temp = contentProvider.GetContent(fileName);

      var p = new Post();

      var settingsString = GetSettingsString(temp);
      p.MetaData = GetMetaData(settingsString);
      p.ExcerptAsHtml = markdownService.ToHtml(GetExcerpt(temp));

      p.BodyAsHtml = markdownService.ToHtml(GetBody(temp));

      return p;
    }


    private PostMetaData GetMetaData(string settingsString)
    {
      var parsed = ParseSettings(settingsString);
      var metaData = new PostMetaData();

      if (parsed.ContainsKey("author"))
      {
        metaData.Author = parsed["author"] as string;
      }

      if (parsed.ContainsKey("created"))
      {
        var strDate = parsed["created"] as string;

        var date = DateTime.Parse(strDate);
        metaData.CreatedDate = date;
      }

      if (parsed.ContainsKey("title"))
      {
        metaData.Title = parsed["title"] as string;
      }

      if (parsed.ContainsKey("categories"))
      {
        var categories = parsed["categories"] as string;
        if (categories != null) metaData.Categories = categories.Split(',').ToList();
      }

      return metaData;
    }


    private string GetSettingsString(string input)
    {
      var startOfSettingsIndex = input.IndexOf("---", StringComparison.InvariantCultureIgnoreCase);
      if (startOfSettingsIndex >= 0)
      {
        //Find the second index of --- after the first
        var endOfSettingsIndex = input.IndexOf("---", startOfSettingsIndex + 3,
            StringComparison.InvariantCultureIgnoreCase);

        //If we find the 2nd index, parse the settings
        //Otherwise we assume there's no header or settings...
        if (endOfSettingsIndex >= 0)
        {
          return input.Substring(startOfSettingsIndex, endOfSettingsIndex + 3);

        }

      }
      return "";
    }

    private string GetBody(string input)
    {
      var startOfExcerpt = input.IndexOf("---excerpt", StringComparison.InvariantCultureIgnoreCase);
      var endOfExcerpt = input.IndexOf("---end", startOfExcerpt + 10, StringComparison.InvariantCultureIgnoreCase);
      if (startOfExcerpt >= 0 && endOfExcerpt > startOfExcerpt)
      {
        return input.Substring(endOfExcerpt + 6, input.Length - (endOfExcerpt + 6));
      }

      return input;
    }

    private string GetExcerpt(string input)
    {
      var startOfExcerpt = input.IndexOf("---excerpt", StringComparison.InvariantCultureIgnoreCase);
      var endOfExcerpt = input.IndexOf("---end", startOfExcerpt + 10, StringComparison.InvariantCultureIgnoreCase);
      if (startOfExcerpt >= 0 && endOfExcerpt > startOfExcerpt)
      {
        return input.Substring(startOfExcerpt + 10, endOfExcerpt - (startOfExcerpt + 10));
      }

      return "";
    }

    public static Dictionary<string, object> ParseSettings(string rawSettings)
    {
      if (string.IsNullOrWhiteSpace(rawSettings))
      {
        return new Dictionary<string, object>();
      }

      rawSettings = rawSettings.Trim('-');

      var lines = rawSettings.Split(new[] { "\n", "\r", "\n\r" }, StringSplitOptions.RemoveEmptyEntries);
      var result = new Dictionary<string, object>();

      for (int i = 0; i < lines.Length; i++)
      {
        var line = lines[i].Trim();
        var setting = line.Split(new[] { ':' }, 2, StringSplitOptions.RemoveEmptyEntries);

        if (setting.Length == 1)
        {
          //This most likely means that the setting has sub-settings
          var counter = i + 1;
          var subLines = new List<string>();
          var settingName = setting[0];

          for (; counter < lines.Length; counter++)
          {
            var subLine = lines[counter];

            if (char.IsWhiteSpace(subLine, 0))
            {
              subLines.Add(subLine);
              continue;
            }

            break;
          }

          i = counter - 1;
        }
        else
        {
          result.Add(setting[0].Trim(), setting[1].Trim());
        }
      }

      return result;
    }
  }
}