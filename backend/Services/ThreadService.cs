using System;
using sharedia.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using sharedia.Exceptions;
using sharedia.Repositories;

namespace sharedia.Services
{
    public class ThreadService : IThreadService
    {
        private readonly IThreadRepository _threadRepository;

        public ThreadService(IThreadRepository threadRepository)
        {
            _threadRepository = threadRepository;
        }

        public async Task<List<Thread>> GetAllThreadByParentIdAsync(string parentId)
        {
            IEnumerable<Thread> threads = null;

            try
            {
                threads = await _threadRepository.GetAllByParentId(parentId);
                return threads.ToList();
            }
            catch (Exception)
            {
            }

            if (threads == null)
            {
                throw new ThreadNotFoundException();
            }

            return null;
        }

        public async Task DislikeThreadAsync(string parentId, string userEmail)
        {
            Thread thread = null;

            if (parentId == null)
            {
                throw new ArgumentNullException(nameof(parentId));
            }

            if (userEmail == null)
            {
                throw new ArgumentNullException(nameof(userEmail));
            }

            try
            {
                thread = await _threadRepository.GetByIdAsync(parentId);
            }
            catch (Exception)
            {
            }

            if (thread == null)
            {
                throw new ThreadNotFoundException();
            }

            thread.Like.Remove(userEmail);

            if (thread.Dislike.Contains(userEmail))
            {
                thread.Dislike.Remove(userEmail);
            }
            else
            {
                thread.Dislike.Add(userEmail);
            }

            await _threadRepository.UpdateAsync(thread);
        }

        public async Task LikeThreadAsync(string parentId, string userEmail)
        {
            Thread thread = null;

            if (parentId == null)
            {
                throw new ArgumentNullException(nameof(parentId));
            }

            if (userEmail == null)
            {
                throw new ArgumentNullException(nameof(userEmail));
            }

            try
            {
                thread = await _threadRepository.GetByIdAsync(parentId);
            }
            catch (Exception)
            {
            }

            if (thread == null)
            {
                throw new ThreadNotFoundException();
            }

            thread.Dislike.Remove(userEmail);

            if (thread.Like.Contains(userEmail))
            {
                thread.Like.Remove(userEmail);
            }
            else
            {
                thread.Like.Add(userEmail);
            }

            await _threadRepository.UpdateAsync(thread);
        }

        public async Task CreateThreadAsync(Thread thread)
        {
            await _threadRepository.CreateAsync(thread);
        }
    }
}