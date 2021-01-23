import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  product:Product=new Product();

  error:any;

  constructor(private service:ProductService, 
    private router:Router,
    private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id: number= +params.get('id'); // el mas es para costear a number
      if(id){
        this.service.ver(id).subscribe(cust=> this.product= cust)
      }
    })
  }
  public crear():void{
    this.service.crearProducts(this.product).subscribe(product=>{
      console.log(product);
      Swal.fire('Nuevo',`Producto ${product.name} creado con exito`,'success')
      this.router.navigate(['/products']); 
    }, err=> {
      if(err.status===400){
        this.error=err.error;
        console.log(this.error)
        
      }
    });
  }

  public editar():void{
    this.service.editarProducts(this.product).subscribe(product=>{
      console.log(product);
      Swal.fire('Modificado',`Producto ${product.name} actualizado con exito`,'success')
      this.router.navigate(['/products']); 
    }, err=> {
      if(err.status===400){
        this.error=err.error;
        console.log(this.error)
        
      }
    });
  }


}
