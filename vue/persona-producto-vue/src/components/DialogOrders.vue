<template>
<v-dialog v-model="show" max-width="500px">
            
            <v-card>
              <v-card-title class="cyan withe-text">
               <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-combobox
                        v-model="prod"
                        :items="products"                      
                        item-text="name"
                       
                        label=" Products"
                        outlined
                        
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-combobox
                        v-model="cust"
                        :items="customers"
                        
                        item-text="name"
                        
                        label="Customers"
                        outlined
                      >
                      <!-- esto se realiza para que muestre el nombre completo cuando se seleccione y cuando se muestre -->
                      <template v-slot:selection="data">
                      {{ data.item.name }} - {{ data.item.surname }}
                      </template>
                      <template v-slot:item="data" >
                          {{ data.item.name }} - {{ data.item.surname }}
                        </template>
                      </v-combobox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue accent-2" v-on:click="cancelar"> cancelar</v-btn>
                <v-btn color="teal accent-2" v-on:click="guardar"> guardar</v-btn>
              </v-card-actions>

            </v-card>
          </v-dialog>
</template>


<script>
// @ is an alias to /src


export default {
  name: 'DialogOrder',

  props:{
      dialog:{
      type:Boolean,
      default:false
      },
      formTitle:{
          type:String,
          default: ""
      },
      customer:{
          type:Object,
          default() {
            return {}
        }
      },
      product:{
          type:Object,
          default() {
            return {}
        }},
      cancelarFuntion:{
          type:Function,
          default: null
      },
      guardarFuntion:{
          type:Function,
          default: null
      },
      customers:{
        type:Array
      },
      products:{
        type:Array
      }

  },
  methods:{
    cancelar() {
          this.$emit("cancelarFuntion");
      },
       guardar() {
            this.$emit("guardarFuntion");
       },
      
     


  },
  computed:{


        show: {
       get () {
      return this.dialog
        },
        set (val) {
      this.$emit('update:dialog', val)
            }
        },

        cust: {
       get () {
      return this.customer
        },
        set (val) {
      this.$emit('update:customer', val)
            }
        },
        prod: {
       get () {
      return this.product
        },
        set (val) {
      this.$emit('update:product', val)
            }
        },
        
      
  }
}
</script>
