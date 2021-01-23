import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Product } from 'src/app/models/product';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent implements OnInit {
  order:Order=new Order();
  product:Product=new Product();
  customer:Customer=new Customer();
  listaCustomers: Customer[]=[];
  listaProducts:Product[]=[];
 
  error:any;

  constructor(private service:OrderService,
    private serviceCustomer:CustomerService,
    private serviceProduct:ProductService, 
    private router:Router,
    private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id: number= +params.get('id'); // el mas es para castear a number
      if(id){
        this.service.ver(id).subscribe(cust=> this.order= cust)
      }
    });

    this.serviceCustomer.listarCustomer().subscribe(cust=> this.listaCustomers=cust);
    this.serviceProduct.listarProducts().subscribe(prod=> this.listaProducts=prod);
  }
  public crear():void{
    this.order.products=this.product
    this.order.customers=this.customer
    this.service.crearOrder(this.order).subscribe(order=>{
      console.log(order);
      Swal.fire('Nuevo',`Orden ${order.id} creado con exito`,'success')
      this.router.navigate(['/orders']); 
    }, err=> {
      if(err.status===400){
        this.error=err.error;
        console.log(this.error)
        
      }
    });
  }

  public editar():void{
    this.order.products=this.product
    this.order.customers=this.customer
    this.service.editarOrder(this.order).subscribe(order=>{
      console.log(order);
      Swal.fire('Modificado',`Orden ${order.id} actualizado con exito`,'success')
      this.router.navigate(['/orders']); 
    }, err=> {
      if(err.status===400){
        this.error=err.error;
        console.log(this.error)
        
      }
    });
  }
  compararCustomers(a1:Customer, a2:Customer): boolean{
    if(a1===undefined && a2=== undefined){
      console.log("comparar customers : true")
      return true;
     
    }
    
    return (a1 === null || a2===null || a1=== undefined || a2===undefined)
    ?false: a1.id=== a2.id;
  }

  compararProducts(a1:Product, a2:Product): boolean{
    if(a1===undefined && a2=== undefined){
      console.log("comparar products : true")
      return true;
    }
    
    return (a1 === null || a2===null || a1=== undefined || a2===undefined)
    ?false: a1.id=== a2.id;
  }

  seleccionar():void{
    console.log("paso x seleccionar")
    this.customer.id=this.order.customers.id
    this.customer.name=this.order.customers.name
    this.customer.surname=this.order.customers.surname
  }
  
}
