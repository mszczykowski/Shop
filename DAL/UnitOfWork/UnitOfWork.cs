using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using DAL.Repositories;

namespace DAL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;

        public IProductRepository ProductsRepository { get; private set; }

        public UnitOfWork(DbContext context)
        {
            _context = context;
            ProductsRepository = new ProductRepository(context);
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
