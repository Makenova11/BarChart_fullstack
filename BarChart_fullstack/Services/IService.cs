using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BarChart_fullstack.Context;

namespace BarChart_fullstack.Services
{
    public interface IService<T>
        where T : Employee
    {
        public Task<IQueryable<T>> GetAll();

        public Task<List<T>> CreateAll(IEnumerable<T> entity);

        public Task DeleteAll();

    }
}
