import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductApiService } from '../shared/product-api.service';
import { ProductModel } from '../models/productModel';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css']
})
export class ProductsDashboardComponent implements OnInit {

  productForm !: FormGroup;

  product = new ProductModel();

  productData !: any

  addVisible !: boolean
  editVisible !: boolean

  constructor(private formbuilder: FormBuilder, private api : ProductApiService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(this.product.name, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      number: new FormControl(this.product.number, [
        Validators.pattern('^[0-9]*$')
      ]),
      quantity: new FormControl(this.product.quantity, [
        Validators.pattern('^[0-9]*$')
      ]),
      description: new FormControl(this.product.description, [
        Validators.required,
        Validators.maxLength(200)
      ]),
      price: new FormControl(this.product.quantity, [
        Validators.required,
        Validators.pattern('^(\d+\.\d{1,2})')
      ])
    })

    this.getAllProducts()
  }

  postProduct() {
    this.product.name = this.productForm.value.name
    this.product.number = this.productForm.value.number
    this.product.quantity = this.productForm.value.quantity
    this.product.description =  this.productForm.value.description
    this.product.price =  this.productForm.value.price
    

    this.api.postProduct(this.product)
    .subscribe(res => {
      console.log(res)
      alert("Product added successfully")
      this.productForm.reset()
      let cancel = document.getElementById('cancel')
      cancel?.click()
      this.getAllProducts()
    },
    err => {
      alert("something went wrong")
    })
  }

  getAllProducts() {
    this.api.getProducts()
    .subscribe(res => {
      this.productData = res
    })
  }

  deleteProduct(row : any) {
    this.api.deleteProduct(row.id)
    .subscribe(res=> {
      alert("Product deleted")
      this.getAllProducts()
    })
  }

  onAdd()
  {
    this.productForm.reset()
    this.editVisible = false;
    this.addVisible = true;
    this.product.id = 0;
  }

  onEdit(row : any) {
    this.editVisible = true;
    this.addVisible = false;
    this.product.id = row.id
    this.productForm.controls['name'].setValue(row.name)
    this.productForm.controls['number'].setValue(row.number)
    this.productForm.controls['quantity'].setValue(row.quantity)
    this.productForm.controls['description'].setValue(row.description)
    this.productForm.controls['price'].setValue(row.price)
  }

  updateProduct()
  {
    this.product.name = this.productForm.value.name
    this.product.number = this.productForm.value.number
    this.product.quantity = this.productForm.value.quantity
    this.product.description =  this.productForm.value.description
    this.product.price =  this.productForm.value.price
    
    this.api.putProduct(this.product.id, this.product)
    .subscribe(res => {
      alert("Updated")
      let cancel = document.getElementById('cancel')
      cancel?.click()
      this.getAllProducts()
    })
  }

}
