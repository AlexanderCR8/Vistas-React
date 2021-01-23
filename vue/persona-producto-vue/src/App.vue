<template>
  <v-app>
    <b-navbar toggleable="lg" type="dark" variant="info">
    
    <b-container>
    <b-navbar-brand href="#">NavBar</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{name:'Home'}">Home</b-nav-item>
        <b-nav-item  :to="{name:'Customers'}" >Clientes</b-nav-item>
        <b-nav-item  :to="{name:'Products'}" >Productos</b-nav-item>
        <b-nav-item  :to="{name:'Orders'}" >Ordenes</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
    </b-container>
  </b-navbar>
  <v-main>
    <v-container>
    <router-view/>
    </v-container>
  </v-main>
  </v-app>
</template>


<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
