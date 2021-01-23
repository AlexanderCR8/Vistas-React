import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {
  customer:Customer=new Customer();

  error:any;

  constructor(private service:CustomerService, 
    private router:Router,
    private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id: number= +params.get('id'); // el mas es para costear a number
      if(id){
        this.service.ver(id).subscribe(cust=> this.customer= cust)
      }
    })
  }
  public crear():void{
    this.service.crearCustomer(this.customer).subscribe(customer=>{
      console.log(customer);
      Swal.fire('Nuevo',`Alumno ${customer.name} creado con exito`,'success')
      this.router.navigate(['/customers']); 
    }, err=> {
      if(err.status===400){
        this.error=err.error;
        console.log(this.error)
        
      }
    });
  }

  public editar():void{
    this.service.editarCustomer(this.customer).subscribe(customer=>{
      console.log(customer);
      Swal.fire('Modificado',`Alumno ${customer.name} actualizado con exito`,'success')
      this.router.navigate(['/customers']); 
    }, err=> {
      if(err.status===400){
        this.error=err.error;
        console.log(this.error)
        
      }
    });
  }

}
