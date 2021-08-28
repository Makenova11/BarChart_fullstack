using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BarChart_fullstack.Context;
using BarChart_fullstack.Services;

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


        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<List<Employee>> Post([FromServices] IService<Employee> service, [FromBody] IEnumerable<Employee> report)
        {
            return await service.CreateAll(report);
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
