using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {
        }

        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            builder.Entity<Value>()
                .HasData(
                new Value { Id = 1, Name = "Mishal"},
                new Value { Id = 2, Name = "Ibrahim"},
                new Value { Id = 3, Name = "Khalaf"},
                new Value { Id = 4, Name = "Zack"},
                new Value { Id = 5, Name = "Faisal"},
                new Value { Id = 6, Name = "Abduallah"},
                new Value { Id = 7, Name = "Bader"}
            );
        }
    }
}
