import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  titulo='Listado de Productos';
  products:Product[];
  page = 1;
  pageSize =5;
  //dtOptions: DataTables.Settings = {};

  constructor(private service:ProductService) { }

  ngOnInit(): void {
    /* this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }; */
    this.service.listarProducts().subscribe(customer=> this.products=customer);
  }

  public eliminar(product:Product){

    Swal.fire({
      title: 'Cuidado:',
      text: `¿seguro que deseas eliminar a ${product.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarProduct(product.id).subscribe(()=> {
          //filtramos para que aparscan la lista de customers sin el eliminado
          this.products=this.products.filter(a=> a!== product);
          Swal.fire('Eliminado',`Producto ${product.name} eliminado con exito`,'success')
        });
      }
    });
    
  }


}
