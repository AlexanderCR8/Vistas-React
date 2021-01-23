import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseEndpoit='http://localhost:8084/orders'
  private cabeceras:HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

  public listarOrder(): Observable<Order[]>{
    return this.http.get<Order[]>(this.baseEndpoit);
  }

  public ver(id:number):Observable<Order>{
    return this.http.get<Order>(`${this.baseEndpoit+'/order'}/${id}`);
  }
  public crearOrder(order:Order): Observable<Order>{
    return this.http.post<Order>(this.baseEndpoit+'/crear',order,{ headers: this.cabeceras});
  }

  public editarOrder(order:Order): Observable<Order>{
    return this.http.put<Order>(this.baseEndpoit+'/actualizar',order,{ headers: this.cabeceras});
  }
  public eliminarOrder(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoit+'/eliminar'}/${id}`);
  }
}
