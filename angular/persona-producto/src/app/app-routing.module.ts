import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersFormComponent } from './components/customers/customers-form.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OrdersFormComponent } from './components/orders/orders-form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsFormComponent } from './components/products/products-form.component';
import { ProductsComponent } from './components/products/products.component';


const routes: Routes = [
  {path:'customers',component:CustomersComponent},
  {path:'products',component:ProductsComponent},
  {path:'orders',component:OrdersComponent},
  {path:'customers/form',component:CustomersFormComponent},
  {path:'customers/form/:id',component:CustomersFormComponent},
  {path:'products/form',component:ProductsFormComponent},
  {path:'products/form/:id',component:ProductsFormComponent},
  {path:'orders/form',component:OrdersFormComponent},
  {path:'orders/form/:id',component:OrdersFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
