<template>
  <div id="patientHome">
  <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Start Bootstrap </div>
      <div class="list-group list-group-flush">
        <router-link to='/patient/clinicList' exact class="list-group-item list-group-item-action bg-light">Lista klinika</router-link>
        <router-link to='/patient/history' exact class="list-group-item list-group-item-action bg-light">Istorija bolesti</router-link>
        <router-link to='/patient/karton' exact class="list-group-item list-group-item-action bg-light">Karton</router-link>
        <router-link to='/patient/profile' exact  class="list-group-item list-group-item-action bg-light">Profile</router-link>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">

      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button  class="btn btn-primary" v-on:click='toggleMenu' id="menu-toggle">Toggle Menu</button>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item active">
             <router-link to='/patient' class="nav-link" >Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to='/patient/zakazaniPregledi' class="nav-link">Zakazani pregledi</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu 
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <router-link to='/patient/clinicList' exact class="list-group-item list-group-item-action bg-light">Lista klinika</router-link>
                <router-link to='/patient/history' exact class="list-group-item list-group-item-action bg-light">Istorija bolesti</router-link>
                <router-link to='/patient/karton' exact class="list-group-item list-group-item-action bg-light">Karton</router-link>
                <router-link to='/patient/profile' exact  class="list-group-item list-group-item-action bg-light">Profile</router-link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container-fluid">      
        <div class="container-fluid">
          <router-view name="patientHome">
            
          </router-view>
        </div>
      </div>
    </div>
    <!-- /#page-content-wrapper -->

  </div>
  </div>
</template>

<script>

export default {
  name: 'PatientHome',
  components: {
 
  },
  methods:{
    toggleMenu:function(e) {
        e.preventDefault();
        const wrapper = document.getElementById("wrapper")
          if(wrapper.classList.contains("toggled")){
            wrapper.classList.remove("toggled");
          }
         else{
           wrapper.classList.add("toggled");
         }
      }
  }
}
</script>

<style scoped>
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
  #menu-toggle{
    background:#e8491d;
  }
}
</style>