using System;
using sharedia.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            try
            {
                var threads = await _threadRepository.GetAllByParentId(parentId);
                return threads.ToList();
            }
            catch (Exception)
            {
            }

            return null;
        }

        public async Task CreateThreadAsync(Thread thread)
        {
            try
            {
                await _threadRepository.CreateAsync(thread);
            }
            catch (Exception)
            {
            }
        }
    }
}