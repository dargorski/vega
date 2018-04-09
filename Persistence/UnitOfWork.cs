using System.Threading.Tasks;
using vegaa.Core;

namespace vegaa.Persistence
{
    public class UnitOfWork : IUnitOfWork
        {
         private readonly VegaDbContext context;
         public UnitOfWork(VegaDbContext context)
                {
                    this.context = context;
                }

         public async Task CompleteAsync(){
                    await context.SaveChangesAsync();
                }
        }
}