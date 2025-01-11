using System.IO;

namespace AiR_Simulator.Utilities
{
    public static class FileUtils
    {
        public static string FindFileRecursively(string fileName)
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            while (currentDirectory != null)
            {
                var filePath = Path.Combine(currentDirectory, fileName);
                if (File.Exists(filePath))
                    return filePath;
                
                currentDirectory = Directory.GetParent(currentDirectory)?.FullName;
            }
            throw new FileNotFoundException($"Could not find {fileName} in any parent directory");
        }
    }
} 