import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductApiService } from '../shared/product-api.service';
import { ProductModel } from '../models/productModel';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css']
})
export class ProductsDashboardComponent implements OnInit {

  formValue !: FormGroup;

  productModelObj = new ProductModel();

  productData !: any

  addVisible !: boolean
  editVisible !: boolean

  constructor(private formbuilder: FormBuilder, private api : ProductApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : [''],
      number : [''],
      quantity : [''],
      description : [''],
      price : ['']
    })

    this.getAllProducts()
  }

  postProduct() {
    this.productModelObj.name = this.formValue.value.name
    this.productModelObj.number = this.formValue.value.number
    this.productModelObj.quantity = this.formValue.value.quantity
    this.productModelObj.description =  this.formValue.value.description
    this.productModelObj.price =  this.formValue.value.price
    

    this.api.postProduct(this.productModelObj)
    .subscribe(res => {
      console.log(res)
      alert("Product added successfully")
      this.formValue.reset()
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
    this.formValue.reset()
    this.editVisible = false;
    this.addVisible = true;
    this.productModelObj.id = 0;
  }

  onEdit(row : any) {
    this.editVisible = true;
    this.addVisible = false;
    this.productModelObj.id = row.id
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['number'].setValue(row.number)
    this.formValue.controls['quantity'].setValue(row.quantity)
    this.formValue.controls['description'].setValue(row.description)
    this.formValue.controls['price'].setValue(row.price)
  }

  updateProduct()
  {
    this.productModelObj.name = this.formValue.value.name
    this.productModelObj.number = this.formValue.value.number
    this.productModelObj.quantity = this.formValue.value.quantity
    this.productModelObj.description =  this.formValue.value.description
    this.productModelObj.price =  this.formValue.value.price
    
    this.api.putProduct(this.productModelObj.id, this.productModelObj)
    .subscribe(res => {
      alert("Updated")
      let cancel = document.getElementById('cancel')
      cancel?.click()
      this.getAllProducts()
    })
  }

}
