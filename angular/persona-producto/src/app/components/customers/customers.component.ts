import { Component, OnInit, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2'
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable} from 'rxjs';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';




@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [DecimalPipe]
})
export class CustomersComponent implements OnInit {
  titulo='Listado de Clientes';
  customers:Customer[];
  page = 1;
  pageSize =5;

  customers$: Observable<Customer[]>;
  filter = new FormControl('');
 // dtOptions: DataTables.Settings = {};

  constructor(private service:CustomerService,
    private pipe: DecimalPipe) { 
      
    }

  ngOnInit(): void {
    /* this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }; */
    
    
    this.service.listarCustomer().subscribe(customer=> this.customers=customer);
    this.customers$ =this.filter.valueChanges.pipe(
      startWith(''),
    map(text => this.search(text, this.pipe))

    )
    
  }

  public eliminar(customer:Customer){

    Swal.fire({
      title: 'Cuidado:',
      text: `¿seguro que deseas eliminar a ${customer.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarCustomer(customer.id).subscribe(()=> {
          //filtramos para que aparscan la lista de customers sin el eliminado
          this.customers=this.customers.filter(a=> a!== customer);
          Swal.fire('Eliminado',`Alumno ${customer.name} eliminado con exito`,'success')
        });
      }
    });
    
  }

  public search(text: string, pipe: PipeTransform): Customer[] {
    return this.customers.filter(country => {
      const term = text.toLowerCase();
      return country.name.toLowerCase().includes(term)
          || country.surname.toLowerCase().includes(term)
          || pipe.transform(country.id).includes(term)
          
    });
  }

}
