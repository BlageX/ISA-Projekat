<template>
  <div id="app">
   <app-nav></app-nav>
   <router-view></router-view>
   <app-footer></app-footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Navigation from './components/Navigation.vue'
import axios from "axios";

export default {
  name: 'app',
  components: {
    // 'app-header':Header,
    'app-footer':Footer,
    'app-nav':Navigation,
    // HelloWorld
  },
  data:function(){
    return{
      retrivedToken:null,
    }
  },
  methods:{
        //pogledam u locallstorage da li imam token ako ima axios.setHedar(token)... isto kao kod logovnja 
    retriveTokenFromLocalStorage(){
      if(localStorage.getItem('token')){
        this.retrivedToken = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.retrivedToken.accessToken;
      }
    }
  },
  created(){
    localStorage.clear(); //OBAVEZNO PITATI MILANA stavio mi u localStorage Maki2 i divlja sa njim
    this.retriveTokenFromLocalStorage();
  }
}
</script>

<style>

</style>
