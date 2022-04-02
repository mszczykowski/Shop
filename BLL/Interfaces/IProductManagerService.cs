using DAL.Models;

namespace BLL.Interfaces
{
    public interface IProductManagerService
    {
        Task<Product> GetProductByIdAsync(int? id);
        Task AddProductAsync(Product product);
        Task<IEnumerable<Product>> GetProductsAsync();
        Task DeleteProductAsync(int? id);
        Task UpdateProductAsync(int? id, Product product);
    }
}
