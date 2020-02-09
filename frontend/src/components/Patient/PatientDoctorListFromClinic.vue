<template>
  <div id='DoctorListFromClinic'>
    <h2>Lista lekara 3.13 Treba drugi filter</h2>
    <div id='filter'>
      <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand">Filtriraj po:</a>
        <form class="form-inline">

            <input class="form-control mr-sm-2" type="search" placeholder="Ime" aria-label="Search">
            <input class="form-control mr-sm-2" type="search" placeholder="Prezime" aria-label="Search">
            <input class="form-control mr-sm-2" type="search" placeholder="Prosecna ocena" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>

    </div> 
     <div class="container" >
      <table class="table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Prosecna ocena</th>
            <th>Termini</th>
            <th>Odaberi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key='doktor.id' v-for='doktor in doktori'>
            <td>{{doktor.ime}}</td>
            <td>{{doktor.prezime}}</td>
            <td>{{doktor.prosOcena}}</td>
            
            <td>
              <select v-model="odabraniTerminId">
                <option disabled value="">Odaberite termin</option>
                <option v-bind:key='termin' v-bind:value="termin.id" v-for='termin in doktor.termini' >{{termin.pocetakTermina[0]}}h - {{termin.krajTermina[0]}}h</option>
              </select>
           
            </td>
              <td> <button type='button' v-on:click='goToOverview()' class="btn btn-outline-warning my-2 my-sm-0" >Odaberi</button> </td>
          </tr>
        </tbody>
      </table>
    </div> 
  </div>
</template>

<script>
import DoktorDataService from '@/services/DoktorDataService'
export default {
  name:'DoctorListFromClinic',
	data() {
      return {
        doktori:[],
        sviDoktori:[],
        params:null,
        odabraniTerminId:null, //odabraniTermin_id;
        redUTabeli:{
            id:'',
            ime:'',
            prezime:'',
            prosOcena:'',
            termini:[]
        },
       // kategorijeFiltracije:['ime','prezime','prosOcena']        
      }
  },
  methods: {

    splitPregledCena:function(stringToSplit){
        this.splitted = stringToSplit.split(';');
    },

    getDoktorByParameters:function(){
        DoktorDataService.getDoktorByKlinikaSerach(this.params).then((response)=>{
          this.sviDoktori = response.data;
          this.showDoktori(this.sviDoktori);
        });
    },

    showDoktori:function(sviDoktoriPros){
      sviDoktoriPros.forEach(doktor => {
        this.redUTabeli.id = doktor.id
        this.redUTabeli.ime = doktor.ime;
        this.redUTabeli.prezime = doktor.prezime;
        this.redUTabeli.prosOcena = doktor.ocena;
        this.redUTabeli.termini = doktor.termini;
        this.doktori.push(JSON.parse(JSON.stringify(this.redUTabeli)));
      });
    },

    
    goToOverview:function(){
      //this.$router.push({ path: 'overview/' ,name:'PatientOverviewCustomPregled', params: { terminId:this.odabraniTerminId }});
      //ovo gore i ovo dole sinonim- kao ovo dole sam vece stavljao bio id klinike,
      //Ako radim na gornji nacin moram ubaciti name;
      this.$router.push(`overview/${ this.odabraniTerminId }`);
    },
  },

  created(){
    this.params = this.$route.query;
    this.getDoktorByParameters();
  }

}
</script>
