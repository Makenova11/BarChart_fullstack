using BarChart_fullstack.Context;
using BarChart_fullstack.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BarChart_fullstack.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<IQueryable<Employee>> Get(
            [FromServices] IService<Employee> service)
        {
            var result = await service.GetAll();
            return result;
        }

        [HttpGet]
        public async Task<List<Chart>> GetChart(
            [FromServices] IService<Employee> service)
        {
            
            var result = await service.GetAll();
            var list = result.ToList();
            int N = result.ToList().Count;
            List<Chart> chart1 = new List<Chart>(N);
            for (int i = 1; i < N; i++)
            {
                double data = (list[i].DateLastActivity - list[i].DateRegistration).TotalDays;
                chart1.Add(new Chart()
                {
                    userID = list[i].UserID, 
                    num = data
                });
            }
            return chart1;
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
