using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vegaa.Models
{
    public class Feature
    {
        public int id { get; set; }
        [Required]
        [StringLength(255)]
        public string name { get; set; }
    }
}