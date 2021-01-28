<template>
  <div>
    <v-card class="mx-auto mt-5" max-width="1200">
      <h1>Orders</h1>
      <v-btn fab color="teal accent-2"  @click.stop="dialog=true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <DialogOrder :dialog.sync="dialog" v-bind:formTitle="formTitle" :customer.sync="customer" :product.sync="product" v-on:cancelarFuntion="cancelar"
       v-on:guardarFuntion="guardar" v-bind:customers="customers" v-bind:products="products" />
      <v-col cols="12" sm="12">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
      </v-col>
      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        :items-per-page="5"
        class="elevation-3"
        :loading="loadingdata"
        loading-text="Loading... Please wait"
        :footer-props="{
        showFirstLastPage: true
      }"
      >

        <template v-slot:[`item.action`]="{ item }">
          <v-btn class="mr-2" fab dark small color="cyan" @click="editar(item)">
            <v-icon dark> mdi-pencil</v-icon>
          </v-btn>
          <v-btn class="mr-2" fab dark small color="red darken-1" @click="borrar(item)">
            <v-icon dark> mdi-delete</v-icon>
          </v-btn>
        </template>


        <template v-slot:[`item.full`]="{ item }">
         {{item.customers.name}} {{item.customers.surname}}
      </template>
      </v-data-table>
      

    </v-card>
  </div>
</template>

<script>
import OrderService from "../services/OrderService";
import CustomerService from "../services/CustomerService";
import ProductService from "../services/ProductService";
import DialogOrder from '../components/DialogOrders'
import Swal from 'sweetalert2'
//import { mdiMagnify } from '@mdi/js';
export default {
  name: "Orders",
  components:{
    DialogOrder
  },
  data: () => ({
      loadingdata:true,
      search: "",
    dialog: false,
     headers: [
      {  text: "ID",align: 'start', value: "id", },
      {  text: "Producto",value: "products.name",},
      {  text: "Cliente",value: "full"},
      { text: "ACCIONES", value: "action", sortable: false },
    ],
    orders: [],
    products:[],
    customers:[],
    editedIndex: -1,
    customer: {
      id: "",
      name: "",
      surname: "",
    },product: {
      id: "",
      name: "",
      descripcion: "",
      price: "",
    },
    order:{
        id:"",
        customers:{id:"",name:"",surname:""},
        products:{id:"",name:"",descripcion:"",price:""}
    },
    defaultItem: {
      id: "",
      customer:{id:"",name:"",surname:""},
      product:{id:"",name:"",descripcion:"",price:""},
    },
    defaultItemCust: {
      id: "",
      name:"",
      surname:"",
    },
    defaultItemProd: {
      id: "",
      name:"",
      descripcion:"",
      price:""
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },
  watch: {
    dialog(val) {
      //console.log(val)
      val || this.cancelar();
    },
  },
  mounted() {
    this.listarOrders();
    this.listarCustomers();
    this.listarProducts();
  },
  methods: {
    listarOrders: function () {
      OrderService.getAll()
        .then((response) => {
          this.orders = response.data;
          this.loadingdata = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    listarCustomers: function () {
      CustomerService.getAll()
        .then((response) => {
          this.customers = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    listarProducts: function () {
      ProductService.getAll()
        .then((response) => {
          this.products = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    postOrder: function () {
      var data = {
        customers: {id:this.customer.id},
        products:{id:this.product.id} ,
      };
      console.log(data);
      OrderService.create(data)
        .then((response) => {
          this.listarOrders();
        })
        .catch((e) => {
          console.log(e);
        });
     // this.customer=this.defaultItem
    },
    editarOrder: function (customer,product,order) {
      var data = {
        id: order.id,
        customers:{id:customer.id},
        products: {id:product.id},
      };
      console.log("entro actualizar");
      console.log(data);
      OrderService.update(data)
        .then((response) => {
          this.listarOrders();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    BorrarOrder: function (id) {
      OrderService.delete(id)
        .then((response) => {
          this.listarOrders();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editar(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.order =  item;
       console.log(this.order.customers.name)
      this.customer =item.customers;
      this.product=item.products;
      this.dialog = true;
    },
    borrar(item) {
          Swal.fire({
              title: 'Estas seguro?',
              text: "¡No podrás revertir esto!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.BorrarOrder(item.id); 
                Swal.fire('Eliminado','Cliente: '+item.id+' eliminado con exito','success') 
              }
            })
    },
    cancelar() {
       //console.log("entro cancelar")
      this.dialog = false;
      this.order =  Object.assign({}, this.defaultItem);
      this.customer= Object.assign({},this.defaultItemCust);
      this.product=Object.assign({},this.defaultItemProd);  
      this.editedIndex = -1;
    
    },
    guardar() {
      if (this.editedIndex > -1) {
        this.editarOrder(this.customer,this.product,this.order);
         Swal.fire('Modificado',`Orden ${this.order.id} ${this.product.name} actualizado con exito`,'success')
      } else {
        if (this.customer.id == "" || this.product.id == "") {
          Swal.fire('Cuidado',' Datos Vacios','error')
        } else {
          this.postOrder();
          Swal.fire('Creado',`Orden ${this.customer.name} ${this.product.name} creado con exito`,'success')
        }
      }
      this.cancelar();
    },
  },
};
</script>