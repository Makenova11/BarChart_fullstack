using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BarChart_fullstack.Context
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }

        [Column(TypeName = "date")]
        public DateTime DateRegistration { get; set; }

        [Column(TypeName = "date")]
        public DateTime DateLastActivity { get; set; }
    }
}
