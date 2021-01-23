import { ProductsComponent } from "../components/products/products.component";
import { Customer } from "./customer";
import { Product } from "./product";

export class Order {
    id:number;
    customers:Customer;
    products:Product;
}
