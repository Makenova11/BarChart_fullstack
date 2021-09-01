using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BarChart_fullstack.Services
{
    public class Chart
    {
        /// <summary>
        /// ID работника
        /// </summary>
        public int userID { get; set; }

        /// <summary>
        /// Разница между Last Activity и Date Registration в днях
        /// </summary>
        public double num { get; set; }

        /// <summary>
        /// Профилирование
        /// Время на обращение и взятие данных из БД
        /// </summary>
        public string getDataTime { get; set; }

        /// <summary>
        /// Профилирование
        /// Время на подсчёт значений для графика
        /// </summary>
        public string getActionTime { get; set; }

        /// <summary>
        /// Профилирование
        /// Общее время выполнения операции
        /// </summary>
        public string getFullTime { get; set; }
    }
}
