import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseEndpoit='http://localhost:8084/products'
  private cabeceras:HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

  public listarProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseEndpoit);
  }

  public ver(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.baseEndpoit+'/product'}/${id}`);
  }
  public crearProducts(customer:Product): Observable<Product>{
    return this.http.post<Product>(this.baseEndpoit+'/crear',customer,{ headers: this.cabeceras});
  }

  public editarProducts(customer:Product): Observable<Product>{
    return this.http.put<Product>(this.baseEndpoit+'/actualizar',customer,{ headers: this.cabeceras});
  }
  public eliminarProduct(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoit+'/eliminar'}/${id}`);
  }
}
