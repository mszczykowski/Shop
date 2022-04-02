using Microsoft.EntityFrameworkCore;
using DAL.Data;
using DAL.Interfaces;
using DAL.Models;

namespace DAL.Repositories
{
    public class ProductRepository : GenericRepository<Product, int>, IProductRepository
    {
        public ProductRepository(DbContext context) : base(context)
        {

        }
    }
}
