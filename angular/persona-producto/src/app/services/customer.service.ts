import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseEndpoit='http://localhost:8084/customers'
  private cabeceras:HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

  public listarCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseEndpoit);
  }

  public ver(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${this.baseEndpoit+'/customer'}/${id}`);
  }
  public crearCustomer(customer:Customer): Observable<Customer>{
    return this.http.post<Customer>(this.baseEndpoit+'/crear',customer,{ headers: this.cabeceras});
  }

  public editarCustomer(customer:Customer): Observable<Customer>{
    return this.http.put<Customer>(this.baseEndpoit+'/actualizar',customer,{ headers: this.cabeceras});
  }
  public eliminarCustomer(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoit+'/eliminar'}/${id}`);
  }
  
}
