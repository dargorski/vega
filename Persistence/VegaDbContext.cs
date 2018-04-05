using Microsoft.EntityFrameworkCore;

namespace vegaa.Persistence
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options)
            : base(options)
            {
            }
    }
}