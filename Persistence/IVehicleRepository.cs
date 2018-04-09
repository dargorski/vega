using System.Threading.Tasks;
using vegaa.Models;

namespace vegaa.Persistence
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id);
    }
}