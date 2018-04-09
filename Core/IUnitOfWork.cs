using System.Threading.Tasks;

namespace vegaa.Core
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}