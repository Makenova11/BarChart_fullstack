using System;
using BarChart_fullstack.Context;
using BarChart_fullstack.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace BarChart_fullstack.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        Stopwatch st = new(); //Для подсчёта обращения к БД
        Stopwatch st2 = new();//Для подсчёта расчёта значений
        Stopwatch st3 = new();//Для подсчёта общего врмеени выполнения

        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<IQueryable<Employee>> Get([FromServices] IService<Employee> service)
        {
            var result = await service.GetAll();
            return result;
        }

        /// <summary>
        /// Построение графика длительности жизни пользователя
        /// </summary>
        /// <param name="service">сервис обращения к контексту</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<List<Chart>> GetChart([FromServices] IService<Employee> service)
        {
            st3.Start();//считаем общее время выполнения
            st.Start();//считаем время на обращение к БД
            var result = await service.GetAll();
            st.Stop();
            var list = result.ToList();
            int N = result.ToList().Count;
            List<Chart> chart1 = new List<Chart>(N);

            st2.Start();//считаем время на подсчёт значений для графика
            for (int i = 0; i < N; i++)
            {
                double data = (list[i].DateLastActivity - list[i].DateRegistration).TotalDays;
                chart1.Add(new Chart()
                {
                    userID = list[i].UserID, 
                    num = data,
                    getDataTime = st.Elapsed.ToString(),
                });
            }
            st2.Stop();
            st3.Stop();
            chart1.Add(new Chart()
            {
                getActionTime = st2.Elapsed.ToString(),
                getFullTime = st3.Elapsed.ToString()
            });
            return chart1;
        }

        /// <summary>
        /// Вычисление значения Rolling Retention 7 Day
        /// </summary>
        /// <param name="service">сервис обращения к контексту</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<double> GetRetention([FromServices] IService<Employee> service)
        {
            var result = await service.GetAll();
            double installedCount = 0; // кол-во установивших приложение
            double actualCount = 0;// кол-во вернувшихся в систему
            DateTime installDay = DateTime.Today.Date.AddDays(-7);
            foreach (var i in result)
            {
                if (i.DateRegistration.Date == installDay || i.DateRegistration.Date < installDay)
                {
                    installedCount++;
                }
                if (i.DateRegistration.Date == installDay || i.DateRegistration.Date > installDay)
                {
                    actualCount++;
                }
            }
            double rollingRetention = Math.Round(actualCount / installedCount * 100, 2) ;
            return rollingRetention;
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<Employee> Post([FromServices] IService<Employee> service, [FromBody] Employee report)
        {
            return await service.Create(report);
        }

        // POST api/<EmployeeController>
        [HttpDelete]
        public async Task<ActionResult> DeleteBulk(
            [FromServices] IService<Employee> service)
        {
            await service.DeleteAll();
            return NoContent();
        }
    }
}
