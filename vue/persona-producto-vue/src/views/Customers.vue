<template>
  <div>
    <v-card class="mx-auto mt-5" max-width="1200">
      <h1>Customers</h1>
      <v-btn fab color="teal accent-2"  @click.stop="dialog=true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <DialogCustomer :dialog.sync="dialog" v-bind:formTitle="formTitle" :customer.sync="customer" v-on:cancelarFuntion="cancelar" v-on:guardarFuntion="guardar" />
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
        :items="customers"
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
import CustomerService from "../services/CustomerService";
import DialogCustomer from '../components/DialogCustomers'
import Swal from 'sweetalert2'
//import { mdiMagnify } from '@mdi/js';
export default {
  name: "Customers",
  components:{
    DialogCustomer
  },
  data: () => ({
    loadingdata:true,
    search: "",
    dialog: false,
    headers: [
      {  text: "ID",align: 'start', value: "id", },
      {  text: "Nombre",value: "name",},
      {  text: "Apellido",value: "surname",},
      { text: "ACCIONES", value: "action", sortable: false },
    ],
    customers: [],
    editedIndex: -1,
    customer: {
      id: "",
      name: "",
      surname: "",
    },
    defaultItem: {
      id: "",
      name: "",
      surname: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },
  watch: {
    dialog(val) {
      console.log(val)
      val || this.cancelar();
    },
  },
  mounted() {
    this.listarCustomers();
  },
  methods: {
    listarCustomers: function () {
      CustomerService.getAll()
        .then((response) => {
          this.customers = response.data;
          this.loadingdata = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    postCustomers: function () {
      var data = {
        name: this.customer.name,
        surname: this.customer.surname,
      };
      console.log(data);
      CustomerService.create(data)
        .then((response) => {
          this.listarCustomers();
        })
        .catch((e) => {
          console.log(e);
        });
     // this.customer=this.defaultItem
    },
    editarCustomer: function (customer) {
      var data = {
        id: customer.id,
        name: customer.name,
        surname: customer.surname,
      };
      console.log("entro actualizar");
      console.log(data);
      CustomerService.update(data)
        .then((response) => {
          this.listarCustomers();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    BorrarCustomer: function (id) {
      CustomerService.delete(id)
        .then((response) => {
          this.listarCustomers();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editar(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.customer =  item;
      console.log(this.customer)
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
                this.BorrarCustomer(item.id); 
                Swal.fire('Eliminado','Cliente: '+item.name+' eliminado con exito','success') 
              }
            })
    },
    cancelar() {
       console.log("entro cancelar")
      this.dialog = false;
      this.customer =  Object.assign({}, this.defaultItem);
     
      this.editedIndex = -1;
    },
    guardar() {
      if (this.editedIndex > -1) {
        this.editarCustomer(this.customer);
         Swal.fire('Modificado',`Customer ${this.customer.name} actualizado con exito`,'success')
      } else {
        if (this.customer.name == "" || this.customer.surname == "") {
          Swal.fire('Cuidado',' Datos Vacios','error')
        } else {
          this.postCustomers();
          Swal.fire('Creado',`Customer ${this.customer.name} creado con exito`,'success')
        }
      }
      this.cancelar();
    },
  },
};
</script>