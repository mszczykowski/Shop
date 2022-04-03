import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http : HttpClient) { }

  postProduct(data : any)
  {
    return this.http.post<any>("https://localhost:7029/api/products", data)
    .pipe(map ((res:any) => {
      return res;
    }))
  }
  getProducts()
  {
    return this.http.get<any>("https://localhost:7029/api/products")
    .pipe(map ((res:any) => {
      return res;
    }))
  }
  putProduct(id : number, data : any)
  {
    return this.http.put<any>("https://localhost:7029/api/products/" + id, data)
    .pipe(map ((res:any) => {
      return res;
    }))
  }
  deleteProduct(id : number)
  {
    return this.http.delete<any>("https://localhost:7029/api/products/" + id)
    .pipe(map ((res:any) => {
      return res;
    }))
  }
}
