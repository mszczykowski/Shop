using FluentValidation;
using DAL.Models;
using BLL.Interfaces;

namespace BLL.Services
{
    public class ProductValidationRules : IProductValidationRules
    {
        public ProductValidationRules()
        {
            RuleFor(Product => Product.Name)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(Product => Product.Price)
                .NotEmpty()
                .GreaterThan(0)
                .ScalePrecision(2, 20);
        }
    }
}
