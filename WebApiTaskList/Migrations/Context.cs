using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApiTaskList.Model;

namespace WebApiTaskList.Migrations
{
    public class Context : DbContext
    {
        public Context() : base("TaskList") { }
        
        public DbSet<TaskList> TaskList { get; set; }
    }
}