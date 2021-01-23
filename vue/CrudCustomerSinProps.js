<template>
  <div>
    <v-card class="mx-auto mt-5" max-width="1200">
      <h1>Customers</h1>
      <v-btn fab color="teal accent-2" @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
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
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            
            <v-card>
              <v-card-title class="cyan withe-text">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="customer.name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="customer.surname"
                        label="Apellido"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue accent-2" @click="cancelar"> cancelar</v-btn>
                <v-btn color="teal accent-2" @click="guardar"> guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-btn class="mr-2" fab dark small color="cyan" @click="editar(item)">
            <v-icon dark> mdi-pencil</v-icon>
          </v-btn>
          <v-btn class="mr-2" fab dark small color="red darken-1" @click="borrar(item)">
            <v-icon dark> mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <template>
        <div class="text-center ma-2">
          <v-snackbar v-model="snackbar">
            {{ textSnack }}
            <v-btn color="info" text @click="snackbar = false"> Cerrar</v-btn>
          </v-snackbar>
        </div>
      </template>
    </v-card>
  </div>
</template>

<script>
import CustomerService from "../services/CustomerService";
//import { mdiMagnify } from '@mdi/js';
export default {
  name: "Customers",
  data: () => ({
    loadingdata:true,
    search: "",
    snackbar: false,
    textSnack: "texto del snack",
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
      //this.customer.name='',
      //this.customer.surname=''
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
      this.customer = Object.assign({}, item);
      this.dialog = true;
    },
    borrar(item) {
      const index = this.customers.indexOf(item);
      let r = confirm("estas seguro de eliminar el registro");
      if (r == true) {
        this.BorrarCustomer(this.customers[index].id);
        this.snackbar = true;
        this.textSnack = "Se elimino el registro con exito";
      } else {
        this.snackbar = true;
        this.textSnack = "Operacion Cancelada";
      }
    },
    cancelar() {
      this.dialog = false;
      this.customer = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    guardar() {
      if (this.editedIndex > -1) {
        let id = this.customer.id;
        let name = this.customer.name;
        let surname = this.customer.surname;
        this.snackbar = true;
        this.textSnack = "Actualizacion Exitosa";
        console.log(this.customer);
        this.editarCustomer(this.customer);
      } else {
        if (this.customer.name == "" || this.customer.surname == "") {
          this.snackbar = true;
          this.textSnack = "Datos incompletos";
        } else {
          this.snackbar = true;
          this.textSnack = "Creacion Exitosa";
          this.postCustomers();
        }
      }
      this.cancelar();
    },
  },
};
</script>