using vegaa.Extensions;

namespace vegaa.Models
{
    public class VehicleQuery : IQueryObject
    {
        public int? MakeId { get; set; }

        public int? ModelId {get; set; }

        public string SortBy { get; set; }

        public bool isSortAscending { get; set; }

    }
}