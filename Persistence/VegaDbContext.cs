using Microsoft.EntityFrameworkCore;
using vegaa.Models;

namespace vegaa.Persistence
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options)
            : base(options)
            {
            }

            public DbSet <Make> Makes { get; set; }
    }
}