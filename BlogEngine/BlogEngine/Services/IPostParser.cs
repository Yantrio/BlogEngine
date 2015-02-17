using BlogEngine.Models;

namespace BlogEngine.Services
{
    public interface IPostParser
    {
        Post Parse(string fileName);
    }
}