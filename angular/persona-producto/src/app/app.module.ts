import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomersFormComponent } from './components/customers/customers-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatTableModule} from '@angular/material/table';
//import { DataTablesModule } from 'angular-datatables';
import { ProductsFormComponent } from './components/products/products-form.component';
import { OrdersFormComponent } from './components/orders/orders-form.component';
import { EditarModalComponent } from './components/orders/editar-modal.component';
//import {MatTableDataSource} from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    ProductsComponent,
    OrdersComponent,
    CustomersFormComponent,
    ProductsFormComponent,
    OrdersFormComponent,
    EditarModalComponent
    
  ],
  entryComponents:[EditarModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTableModule,
   // DataTablesModule,
    MatDialogModule,
    MatInputModule,
    NgbModule,
    ReactiveFormsModule

    
   // MatTableDataSource
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
