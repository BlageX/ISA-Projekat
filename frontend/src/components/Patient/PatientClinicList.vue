<template>
  <div id='ListOfClinics'>
    <h2>Lista klinika 3.13</h2>
    <hr style='background-color:#e8491d;'>
    <div class="container" > 
      <div id='filter'>
        <nav class="navbar navbar-light bg-light justify-content-between">
          <a class="navbar-brand">Filtriranje</a>
          <form class="form-inline">
            <input class="form-control mr-sm-2" v-model='searchedKlinika.datum' type="date" placeholder="Datumu" aria-label="Search">
            <select id='listaTipPregleda' v-model="searchedKlinika.tipPregleda">
              <option disabled value="">Tip pregleda</option>
              <option v-bind:key='tipPregleda' v-for='tipPregleda in listaTipovaPregleda' >{{ tipPregleda.naziv }}</option>
            </select>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click='searchKlinika()'>Search</button>
          </form>
        </nav>
      
      </div> 
        <div class="container" >
        <table class="table">
          <thead>
            <tr>
              <th>Naziv</th>
              <th>Adresa</th>
              <th>Prosecna ocena</th>
              <th>Cena pregleda</th>
              <th>Profil klinike</th>
              <th>Lista lekara</th>
            </tr>
          </thead>
          <tbody>
            <tr v-bind:key='klinika.id' v-for='klinika in klinike'>
              <td>{{klinika.naziv}}</td>
              <td>{{klinika.adresa}}</td>
              <td>{{klinika.ocena}}</td>
              <!-- <td>{{searchedKlinika.tipPregleda.cena}}</td> -->
              {{splitPregledCena(klinika.cene)}}
              <td>
                <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Lista svih cena </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <p v-bind:key='split' v-for='split in splitted' class="dropdown-item"> {{split}} </p> 
                  </div>
                </div>
              </td> 
               <td>{{klinika.cenaPopust}}</td>
              <td>  <button v-on:click='goToKlinikaProfile(klinika.id)' data-toggle="tooltip" data-placement="top" title="Tooltip on top" class="btn btn-outline-secondary">Profil klinike</button></td>
               <td> <button v-on:click='goToDoktorList(klinika.id)' class="btn btn-outline-warning">Lista lekara</button> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> 
  </div>
</template>

<script>
import KlinikaDataService from '@/services/KlinikaDataService'

export default {
  
  name:'ListOfClinics',
	data() {
      return {
        klinike:[],
        //filteredKlinike:[], //lista u koju smestam klinike nakon unetih tipPregleda i datum;
        splitted:[],
        searchedKlinika:{
          datum:'',
          tipPregleda:'',
        },
        listaTipovaPregleda:[],
        cena:'',
      }
  },
  methods: {
    refreshKlinike:function(){
      KlinikaDataService.getAllKlinika().then((response)=>{
        this.klinike = response.data;
      });
    },

    splitPregledCena:function(stringToSplit){
      this.splitted = stringToSplit.split(';');
    },

    goToKlinikaProfile:function(id){
      this.$router.push(`clinicList/profile/${id}`);
    },

    goToDoktorList:function(klinikaId){
      // with query, resulting in /register?plan=private
      //router.push({ path: 'register', query: { plan: 'private' }})
      this.$router.push({ path: '/patient/clinicList/doctorList', query: { klinikaId:klinikaId, datum: this.searchedKlinika.datum , tipPregleda: this.searchedKlinika.tipPregleda } } );
    },

    getAllTipPregleda:function(){
      KlinikaDataService.getAllTipPregleda().then((response)=>{
        this.listaTipovaPregleda = response.data;
      });
    },
    
    searchKlinika:function(){
        this.klinike=[];
        KlinikaDataService.getSearchedKlinika(this.searchedKlinika).then((response)=>{
        this.klinike = response.data;
      });
    }
  },
  computed:{
  
  },
  created(){
    this.refreshKlinike();
    this.getAllTipPregleda();
  }
}
</script>

<style scoped>
#listaTipPregleda{
  padding:7px;
  margin-right: 10px
}
</style>