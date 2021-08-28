using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BarChart_fullstack.Context;
using Microsoft.EntityFrameworkCore;

namespace BarChart_fullstack.Services
{
    public class Service<T> : IService<T>

        where T : Employee
    {
        public EmployeeContext _context { get; set; }

        public Service(EmployeeContext context)
        {
            this._context = context;
        }

        /// <summary>
        /// Получение данных из БД
        /// </summary>
        /// <returns></returns>
        public async Task<IQueryable<T>> GetAll()
        {

            var query = this._context.Set<T>().AsNoTracking();
            await query.LoadAsync();
            return query;
        }

        /// <summary>
        /// Удаление 
        /// </summary>
        public async Task DeleteAll()
        {
            foreach (var item in _context.Employee)
            {
                _context.Employee.Remove(item);
            }
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Массовое добавление в БД
        /// </summary>
        /// <param name="entity">данные модели</param>
        /// <returns></returns>
        public async Task<List<T>> CreateAll(IEnumerable<T> entity)

        {
            await DeleteAll();
            await this._context.Set<T>().AddRangeAsync(entity);
            await this._context.SaveChangesAsync();
            var result = entity.ToList();
            return result;
        }

    }
}
