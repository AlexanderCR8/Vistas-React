import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.css']
})
export class EditarModalComponent implements OnInit {
  customer:Customer;
  product:Product;
  order:Order;
  listaCustomers: Customer[]=[];
  listaProducts:Product[]=[];
  error:any;
  productos:Product=new Product();
  clientes:Customer=new Customer();

  respuesta=new Order();
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public modalRef: MatDialogRef<EditarModalComponent>,
  private service:OrderService,
  private serviceCustomer:CustomerService,
  private serviceProduct:ProductService,
  private router:Router, ) { }

  ngOnInit(): void {
    this.customer=this.data.customer as Customer;
    this.product=this.data.product as Product;
    this.order=this.data.order as Order;
    
    this.serviceCustomer.listarCustomer().subscribe(cust=> this.listaCustomers=cust);
    this.serviceProduct.listarProducts().subscribe(prod=> this.listaProducts=prod);
  }
  cancelar():void{
    this.modalRef.close();
  }

 
  responder():void{
    this.respuesta.id=this.order.id
    this.respuesta.customers=this.clientes
    this.respuesta.products=this.productos
    console.log(this.respuesta)
    if(this.respuesta.id !== undefined|| this.respuesta.customers !==undefined || this.respuesta.products !==undefined){
      this.service.editarOrder(this.respuesta).subscribe(order=>{
        console.log(order);
        Swal.fire('Modificado',`Orden ${order.id} actualizado con exito`,'success')
        
       // this.router.navigate(['/orders']); 
        this.modalRef.close();
      //
      }, err=> {
        if(err.status===400){
          this.error=err.error;
          console.log(this.error)
          
        }
      });
    }
    


  }

}
