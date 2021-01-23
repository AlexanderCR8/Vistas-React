<template>
  <div>
    <v-card class="mx-auto mt-5" max-width="1200">
      <h1>Product</h1>
      <v-btn fab color="teal accent-2"  @click.stop="dialog=true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <DialogProduct :dialog.sync="dialog" v-bind:formTitle="formTitle" :product.sync="product" v-on:cancelarFuntion="cancelar" v-on:guardarFuntion="guardar" />
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
        :items="products"
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
      </v-data-table>

    </v-card>
  </div>
</template>

<script>
import ProductService from "../services/ProductService";
import DialogProduct from '../components/DialogProduct'
import Swal from 'sweetalert2'
//import { mdiMagnify } from '@mdi/js';
export default {
  name: "Products",
  components:{
    DialogProduct
  },
  data: () => ({
    loadingdata:true,
    search: "",
    dialog: false,
    headers: [
      {  text: "ID",align: 'start', value: "id", },
      {  text: "ITEM",value: "name",},
      {  text: "Descripción",value: "descripcion",},
      {  text: "Precio",value: "price",},
      { text: "ACCIONES", value: "action", sortable: false },
    ],
    products: [],
    editedIndex: -1,
    product: {
      id: "",
      name: "",
      descripcion: "",
      price: "",
    },
    defaultItem: {
      id: "",
      name: "",
      descripcion: "",
      price: "",
    },
  }),
  computed: {// se usa para calcular nuevos  datos a partir de otros 
  //Los accesorios calculados se almacenan en caché,por lo que solo se vuelven a calcular cuando las cosas cambian
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },
  watch: {//Son muy útiles para crear efectos secundarios, cosas que no actualizan el estado de la aplicación inmediatamente.
    //el metodo debe tener exactamente el mismo nombre de la varible en data 
    //se usa para ejecutar una función cada vez que cambia la variable .
    dialog(val) {
      val || this.cancelar(); //devuelve su estado(true o false) o manda a ejecutar la funcion cancelar ,
    },
  },
  mounted() {
    this.listarProducts();
  },
  methods: {
    listarProducts: function () {
      ProductService.getAll()
        .then((response) => {
          this.products = response.data;
          this.loadingdata = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    postProduct: function () {
      var data = {
        name: this.product.name,
        descripcion: this.product.descripcion,
        price: this.product.price
      };
      console.log(data);
      ProductService.create(data)
        .then((response) => {
          this.listarProducts();
        })
        .catch((e) => {
          console.log(e);
        });
      //this.customer.name='',
      //this.customer.surname=''
    },
    editarProduct: function (product) {
      var data = {
        id: product.id,
        name: product.name,
        descripcion: product.descripcion,
        price: product.price
      };
      console.log("entro actualizar");
      console.log(data);
      ProductService.update(data)
        .then((response) => {
          this.listarProducts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    BorrarProduct: function (id) {
      ProductService.delete(id)
        .then((response) => {
          this.listarProducts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editar(item) {
      this.editedIndex = this.products.indexOf(item);
      this.product = Object.assign({}, item);// a producto asigna todo lo de item
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
                this.BorrarProduct(item.id); 
                Swal.fire('Eliminado','Producto: '+item.name+' eliminado con exito','success') 
              }
            })
    },
    cancelar() {
      this.dialog = false;// cierra la ventana de dialogo
      this.product = Object.assign({}, this.defaultItem);// setea al customer con valore nulos
      this.editedIndex = -1;
    },
    guardar() {
      if (this.editedIndex > -1) {
        this.editarProduct(this.product);
         Swal.fire('Modificado',`Customer ${this.product.name} actualizado con exito`,'success')
      } else {
        if (this.product.name == "" || this.product.price == "") {
          Swal.fire('Cuidado',' Datos Vacios','error')
        } else {
          this.postProduct();
          Swal.fire('Creado',`Customer ${this.product.name} creado con exito`,'success')
        }
      }
      this.cancelar();
    },
  },
};
</script>