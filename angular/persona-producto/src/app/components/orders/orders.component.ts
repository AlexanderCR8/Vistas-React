import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2'
//import {EditarModalComponent} from './editar-modal.component'
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  closeResult = '';
  titulo='Listado de Ordenes';
  orders:Order[];
  //dtOptions: DataTables.Settings = {};
  customer:Customer=new Customer;
  product : Product=new Product;
  order:Order =new Order;
  error:any;
  listaCustomers: Customer[]=[];
  listaProducts:Product[]=[];


  page = 1;
  pageSize =5;
  

  constructor(private service:OrderService,
    public dialog:MatDialog,
    private modal: NgbModal,
    private serviceCustomer:CustomerService,
    private serviceProduct:ProductService, 
    ) { }

  ngOnInit(): void {
    /* this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }; */
    this.service.listarOrder().subscribe(order=> this.orders=order);
    this.serviceCustomer.listarCustomer().subscribe(cust=> this.listaCustomers=cust);
    this.serviceProduct.listarProducts().subscribe(prod=> this.listaProducts=prod);
  }

  public eliminar(order:Order){
     
    Swal.fire({
      title: 'Cuidado:',
      text: `¿seguro que deseas eliminar a ${order.id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarOrder(order.id).subscribe(()=> {
          //filtramos para que aparscan la lista de customers sin el eliminado
          this.orders=this.orders.filter(a=> a!== order);
          Swal.fire('Eliminado',`Orden ${order.id} eliminado con exito`,'success')
        });
      }
    });
    
  }

/*   public editarOrden(order: Order):void{
    const modalRef=this.dialog.open(EditarModalComponent,{
      width:'750px',
      data:{customer:this.customer, product:this.product, order:order}
    });
    modalRef.afterClosed().subscribe( respuesta=>{
      console.log(respuesta)
      console.log("modal editar ha sido enviado y cerrado")
      this.ngOnInit();
      /* this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.service.listarOrder().subscribe(order=> this.orders=order); */
 //   });
 // }




  
  openL(contenido){
  this.modal.open(contenido,{size:'md',centered:true,});
  }

  seleccionarOrden(orden:Order):void{

   /*  this.customer.id=orden.customers.id;
    this.customer.name=orden.customers.name;
    this.customer.name=orden.customers.surname; */

    this.customer=orden.customers;
    /* this.product.name=orden.products.name;
    this.product.id=orden.products.id;
    this.product.price=orden.products.price;
    this.product.descripcion=orden.products.descripcion; */
    this.product=orden.products;


    this.order.id=orden.id;
    this.order.customers=this.customer;
    this.order.products=this.product;
    console.log("paso x seleccionar")
    console.log(this.order)
  }
  

 EditarOrden():void{
    console.log("paso x editar")
    this.service.editarOrder(this.order).subscribe(order=>{
      console.log(order);
      Swal.fire('Modificado',`Orden ${order.id} actualizado con exito`,'success')
      
     // this.router.navigate(['/orders']); 
      this.modal.dismissAll();
      this.ngOnInit();
    //
    }, err=> {
      if(err.status===400){
        this.error=err.error;
        console.log(this.error)
        
      }
    });

  }

}
