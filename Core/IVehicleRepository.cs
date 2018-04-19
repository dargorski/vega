using System.Collections.Generic;
using System.Threading.Tasks;
using vegaa.Core.Models;
using vegaa.Models;

namespace vegaa.Core
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);

         Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
    }
}