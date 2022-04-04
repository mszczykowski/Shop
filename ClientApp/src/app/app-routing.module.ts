import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDashboardComponent } from './products-dashboard/products-dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes = [
  {path: '', component: ProductsDashboardComponent},
  {path: 'products/:productId', component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }