<template>
  <div id="navigation">
  <nav class="navbar navbar-expand-lg navbar-dark static-top">
      <div class="container">
        <a class="navbar-brand" href="/"><h1><span id='titleEffect'>Medic</span>App</h1></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link to='/' class="nav-link" exact> Home
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to='/about' class="nav-link" exact>About</router-link>
            </li>
            <li class="nav-item">
              <router-link to='/patient' class="nav-link" exact  v-show="loggedIn==true"> Profil pacijenta </router-link>
            </li>
          </ul>
          
          <router-link  to='/login' class="nav-link" exact> <button v-show="loggedIn==false" class="btn" id='btnLogin'>Log In</button> </router-link>
          <button  class="btn" v-show="loggedIn==true" id='btnLogout' v-on:click='logOut()'>Log Out</button> 
        </div>
      </div>
    </nav> 

  </div>
</template>

<script>
import { bus } from '../main'; 
import axios from "axios";
export default {
  name: 'Navigation',
  components: {
  },

  data:function(){
    return{
      // loggedOut: false, //loginvan je treba da pise log out dugme
       loggedIn: false,
    }
  },
  methods:{
    logOut:function(){
      if(confirm('Da li ste sigurni da se zelite izlogovati?')){
        if(localStorage.getItem('token')){
          localStorage.removeItem('token');
          axios.defaults.headers.common['Authorization'] = undefined;
  
          this.loggedIn = false;  //logoutovan je treba da pise log in dugme
          this.$router.push('/');
        }
      }
    },
  
  },
  created(){

    //Prilikom created osluskujem da li je doslo do eventa login i ako jeste kazem da je loginova;
     bus.$on('loggedIn',(data)=>{
       this.loggedIn = data;
     });
  }
}
</script>

<style scoped>
#navigation{
  background-color:#35424a;
  color:#fff;
  padding-top:30px;
  min-height: 70px;
  border-bottom:#e8491d 3px solid;
} 
/* Ostaviti za sada ako ne obrisati */
ul{
  list-style-type: none;
  text-align: center;
  margin:0;
}
li{
  display:inline-block;
  margin: 0;
}

a{
  color:#fff;
  text-decoration: none;
  padding:6px 8px;
  border-radius: 10px;
}

#btnLogin{
  height:38px;
  background-color:#e8491d;
  color:#fff;
  border:none;
  padding: 0 20px;
}

#btnLogin:hover{
  background-color:#cccccc;
  color:#fff;
  font-weight: bold;
}

#btnLogout{
  height:38px;
  background-color:#e8491d;
  color:#fff;
  border:none;
  padding: 0 20px;
}

#btnLogout:hover{
  background-color:#cccccc;
  color:#fff;
  font-weight: bold;
}

#titleEffect{
  color:#e8491d;
  font-weight: bold;
}

.router-link-active{
  border-bottom: #fff solid 1px;
  font-weight: bold;
}
</style>
