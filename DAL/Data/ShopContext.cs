using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL.Data
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions<ShopContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
    }
}

