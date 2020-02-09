<template>
  <div id='DoctorListFromClinic'>
    <h2>Lista lekara 3.14</h2>
    <div id='filter'>
        <nav class="navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand">Filtriraj po:</a>
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="text" placeholder="Ime" aria-label="Search">
                <input class="form-control mr-sm-2" type="text" placeholder="Prezime" aria-label="Search">
                <input class="form-control mr-sm-2" type="text" placeholder="Prosecna ocena" aria-label="Search">
                <input class="form-control mr-sm-2" v-model='searchedDoktor.datum' type="date" placeholder="Datum" aria-label="Search">
                 <select id='listaTipPregleda' v-model="searchedDoktor.tipPregleda">
                  <option disabled value="">Tip pregleda</option>
                  <option v-bind:key='tipPregleda' v-for='tipPregleda in listaTipovaPregleda' >{{ tipPregleda.naziv }}</option>
                </select>
                <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click='searchDoktor()'>Search</button>
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
              <!-- <span>Selected: {{ odabraniTerminId }}</span> -->
            </td>
              <td> <button type='button' v-on:click='goToOverview()' class="btn btn-outline-warning my-2 my-sm-0" >Odaberi</button> </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import KlinikaDataService from '@/services/KlinikaDataService'
import DoktorDataService from '@/services/DoktorDataService'
export default {
  name:'DoctorListFromClinic',
	data() {
      return {
        doktori:[],
        sviDoktori:[],
        odabraniTerminId:null, //odabraniTermin_id;
        redUTabeli:{
          id:'',
          ime:'',
          prezime:'',
          prosOcena:'',
          termini:[]
        },        
        searchedDoktor:{
          klinikaId:'',
          datum:'',
          tipPregleda:'',
        },
        listaTipovaPregleda:[],
     }
  },
  methods: {

    getDoktoriFromKlinika:function(){
    
      //preuzimam kliniku ciji id sam preuzeo iz url i dobavljam njene doktore;
      KlinikaDataService.getKlinika(this.id).then((response)=>{
          this.sviDoktori = response.data.doktori;
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

    splitPregledCena:function(stringToSplit){
      this.splitted = stringToSplit.split(';');
    },

    searchDoktor:function(){
        this.doktori=[];
        this.searchedDoktor.klinikaId = this.id;
        DoktorDataService.getDoktorByKlinikaSerach(this.searchedDoktor).then((response)=>{
        this.doktori = response.data;
      });
    },
    goToOverview:function(){
      this.$router.push(`overview/${ this.odabraniTerminId }`);
    },
    getAllTipPregleda:function(){
      KlinikaDataService.getAllTipPregleda().then((response)=>{
        this.listaTipovaPregleda = response.data;
      });
    },

  },
  computed:{
      id() {
        return this.$route.params.id; //preuzimam id klinike na cijoj sam profilnoj stranici:
      }
  },
  created(){
    this.getDoktoriFromKlinika();
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