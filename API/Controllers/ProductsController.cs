using Microsoft.AspNetCore.Mvc;
using BLL.Interfaces;
using DAL.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductManagerService _productManagerService;

        public ProductsController(IProductManagerService productManagerService)
        {
            _productManagerService = productManagerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return new ObjectResult(await _productManagerService.GetProductsAsync());
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int? id)
        {
            return new ObjectResult(await _productManagerService.GetProductByIdAsync(id));
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int? id, Product product)
        {
            await _productManagerService.UpdateProductAsync(id, product);

            return Ok();
        }

        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> PostProduct(Product product)
        {
            await _productManagerService.AddProductAsync(product);

            return Ok();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _productManagerService.DeleteProductAsync(id);

            return Ok();
        }
    }
}
