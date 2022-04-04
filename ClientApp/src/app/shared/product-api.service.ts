import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'

const apiURL = "https://localhost:7029/api/products/"


@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http : HttpClient) { }

  postProduct(data : any)
  {
    return this.http.post<any>(apiURL, data)
    .pipe(map ((res:any) => {
      return res;
    }))
  }
  getProducts()
  {
    return this.http.get<any>(apiURL)
    .pipe(map ((res:any) => {
      return res;
    }))
  }
  getProductById(id : number)
  {
    return this.http.get<any>(apiURL + id)
    .pipe(map ((res:any) => {
      return res;
    }))
  }
  putProduct(id : number, data : any)
  {
    return this.http.put<any>(apiURL + id, data)
    .pipe(map ((res:any) => {
      return res;
    }))
  }
  deleteProduct(id : number)
  {
    return this.http.delete<any>(apiURL + id)
    .pipe(map ((res:any) => {
      return res;
    }))
  }
}
