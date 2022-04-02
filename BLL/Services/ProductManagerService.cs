using BLL.Interfaces;
using DAL.Models;
using DAL.Interfaces;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace BLL.Services
{
    public class ProductManagerService : IProductManagerService
    {

        private readonly IUnitOfWork _unitOfWork;

        private readonly IProductValidationService _productValidationService;

        public ProductManagerService(IUnitOfWork unitOfWork, IProductValidationService productValidationService)
        {
            _unitOfWork = unitOfWork;
            _productValidationService = productValidationService;
        }

        public async Task AddProductAsync(Product product)
        {
            _productValidationService.ValidateProduct(product);

            await _unitOfWork.ProductsRepository.AddAsync(product);

            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteProductAsync(int? id)
        {
            var productToDelete = await GetProductByIdAsync(id);

            _unitOfWork.ProductsRepository.Remove(productToDelete);

            await _unitOfWork.SaveAsync();
        }

        public async Task<Product> GetProductByIdAsync(int? id)
        {
            _productValidationService.ValidateId(id);

            var product = await _unitOfWork.ProductsRepository.GetByIdAsync((int)id);

            if (product == null)
            {
                throw new ArgumentNullException("Product not found");
            }

            return product;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _unitOfWork.ProductsRepository.GetAllAsync();
        }

        public async Task UpdateProductAsync(int? id, Product product)
        {
            var productToEdit = await GetProductByIdAsync(id);

            PropertyInfo[] properties = typeof(Product).GetProperties();
            foreach (PropertyInfo property in properties)
            {
                property.SetValue(productToEdit, property.GetValue(product));
            }

            await _unitOfWork.SaveAsync();
        }
    }
}
