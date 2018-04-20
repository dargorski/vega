using System.Collections.Generic;
using System.Threading.Tasks;
using vegaa.Core.Models;

namespace vegaa.Core
{
    public interface IPhotoRepository
    {
         Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}