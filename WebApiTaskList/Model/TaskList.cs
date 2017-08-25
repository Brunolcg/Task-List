using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApiTaskList.Model
{
    /// <summary>
    /// Classe que mapeia a tabela taskList com a aplicação
    /// </summary>
    [Table("taskList")]
    public class TaskList
    {
        public int id { set; get; }
        public string title { set; get; }
        public string description { set; get; }
        public DateTime createDate { set; get; }
        public DateTime lastUpdate { set; get; }
        public Boolean status { set; get; }
    }
}