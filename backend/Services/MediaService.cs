using MongoDB.Bson;
using MongoDB.Driver;
using sharedia.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace sharedia.Services
{
    public class MediaService
    {
        // TODO: Configuration
        private const string _storagePath = @"C:\sharedia";
        private readonly IMongoCollection<Media> _media;

        public MediaService(IMongoDatabase database)
        {
            _media = database.GetCollection<Media>("media");
        }

        public async Task<string> InsertMediaAsync(Media media)
        {
            await _media.InsertOneAsync(media);
            return media.Id;
        }

        public async Task<Media> FindMediaAsync(string id)
        {
            var cursor = await _media.FindAsync((document) => document.Id == id);
            var media = await cursor.FirstAsync();
            return media;
        }

        public FileStream GetFileStream(Media media)
        {
            return new FileStream(_storagePath + "/" + media.FilePath + "." + media.Filetype, FileMode.Open, FileAccess.ReadWrite, FileShare.None, 4096, FileOptions.Asynchronous);
        }
    }
}
