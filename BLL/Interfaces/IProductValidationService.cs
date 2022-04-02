using DAL.Models;

namespace BLL.Interfaces
{
    public interface IProductValidationService
    {
        void ValidateProduct(Product product);

        void ValidateId(int? id);
    }
}
