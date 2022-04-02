using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public int Number { get; set; }
        public int Quantity { get; set; }
        [MaxLength(200)]
        public string Description { get; set; }
        [Required]
        [Precision(18, 2)]
        public decimal Price { get; set; }
    }
}