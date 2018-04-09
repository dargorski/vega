using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vegaa.Controllers.Resources;
using vegaa.Models;
using vegaa.Persistence;

namespace vegaa.Controllers
{
    public class FeatureController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public FeatureController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var features = await context.Features.ToListAsync();

            return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features);

            //return mapper.Map<List<Feature>, List<FeatureResource>>(features); 
        }
    }
}