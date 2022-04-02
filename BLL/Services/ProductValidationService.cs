using BLL.Interfaces;
using DAL.Models;
using FluentValidation;

namespace BLL.Services
{
    public class ProductValidationService : IProductValidationService
    {
        private readonly IProductValidationRules _validationRules;

        public ProductValidationService(IProductValidationRules validationRules)
        {
            _validationRules = validationRules;
        }

        public void ValidateProduct(Product product)
        {
            var validationResult = _validationRules.Validate(product);

            if(!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }
        }

        public void ValidateId(int? id)
        {
            if (id == null)
            {
                throw new ValidationException("Id should not be empty");
            }
        }
    }
}
