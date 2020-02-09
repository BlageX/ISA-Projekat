<template>
<div id='PatientKarton'>
  <h2>Karton Pacijenta / <a style='color:#e8491d;' href="#izvestajOPregledu">Izvestaj o pregledu</a></h2>
  <hr style='background-color:#e8491d;'>
  <div class="container" >  
    <div id='pacijentPodaci'>
        <h4>Visina:</h4>
        <p>{{kartonPacijenta.visina}}cm</p>
        <hr>
        <h4>Tezina:</h4>
        <p>{{kartonPacijenta.tezina}}kg</p>
        <hr>
        <h4>Krvna grupa:</h4>
        <p>{{kartonPacijenta.krvnaGrupa}}</p>
        <hr>
        <h4>Dioptrija:</h4>
        <p>{{kartonPacijenta.dioptrija}}</p>
        <hr>
        <h4>Alergije:</h4>
        {{splitAlergije(kartonPacijenta.alergija)}}
        <ul>
            <li v-bind:key="alergija" v-for="alergija in alergijeSplitted">{{alergija}}</li>
        </ul>
    </div>

    <hr style='background-color:#e8491d;'>
    <h3>Izvestaj o pregledu</h3>
    <div id='izvestajOPregledu' class="container" >
      <div id='filter'>
        <nav class="navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand">Filtriranje</a>
            <form class="form-inline" >
            <select v-model="column" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <option v-bind:value="null">No Column Filter</option>
                <option v-for="col in cols" v-bind:key="col">{{ col }}</option>
                </select>
                <input type="text" v-model="search" placeholder="Search">
            </form>
        </nav>
      </div> 
      
      <table class="table">
        <thead>
          <tr>
            <th v-for="col in cols" :key="col"> {{ col }} </th>  
            <th>Details</th>
          </tr>
       
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row.id">
            <td v-for="col in cols" :key="col">{{ row[col] }}</td>
            <td> <button type='button' v-on:click=' goToPatientKartonDetails(row.id)' class="btn btn-outline-warning">Detaljnije</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import PacijentDataService from '@/services/PacijentDataService'
export default {
  name: 'PatientKarton',
  data () {
    return {
        search: null,
        column: null,
        items: [],

        kartonPacijenta:{
            visina:'',
            tezina:'',
            krvnaGrupa:'',
            dioptrija:'',
            alergija:''
        },
        alergijeSplitted:[],//tu ce se  splitovati i u ovom nizu cuvati;
             //ovde hardkodovano kada budem radio preko url samo staviti pregled :[]
        sviPregledi:[],
        pregledi :[], //sredjeniPregledi
        redUTabeli: {
          id:'',
          datum:'',
          vreme:'',
          tipPregleda:'',
          doktor:'',
          dijagnoza:'',
        }
    }
  },
  methods: {
    showPacijentKarton:function(){
        PacijentDataService.getPacijentProfile().then((response)=>{
          this.kartonPacijenta = response.data.zdravstveniKarton;
      });
    },
    // getIzvestajPregleda(){
    //   PacijentDataService.ge
    // },
    getAllPregled(){
      PacijentDataService.getAllFinishedPregled().then((response)=>{
        this.sviPregledi = response.data;
        this.showPregledi(this.sviPregledi);
      });
    },

    showPregledi:function(sviPreglediPros){
      sviPreglediPros.forEach(pregled => {
        this.redUTabeli.id = pregled.id
        this.redUTabeli.datum = pregled.datum;
        this.redUTabeli.vreme = pregled.vreme;
        this.redUTabeli.tipPregleda = pregled.tipPregleda.naziv;
        this.redUTabeli.doktor = pregled.doktor.ime + ' ' + pregled.doktor.prezime ;
        this.redUTabeli.dijagnoza = pregled.izvPregleda.dijagnoza.naziv;

        this.pregledi.push(JSON.parse(JSON.stringify(this.redUTabeli)));
      })
     
    },

    goToPatientKartonDetails:function(id){
      this.$router.push(`/patient/karton/details/${id}`);
    },

    splitAlergije:function(stringToSplit){
        this.alergijeSplitted = stringToSplit.split(',');
    },

  }, //kraj methods

  computed: {
        cols () {
        return this.pregledi.length >= 1 ? Object.keys(this.pregledi[0]) : []
         },
        rows () {
            if (!this.pregledi.length) {
                return []
            }
        
            return this.pregledi.filter(pregled => {
                let props = (this.search && this.column) ? [pregled[this.column]] : Object.values(pregled)
            
            
                return props.some(prop => !this.search || ((typeof prop === 'string') ? prop.includes(this.search) : prop.toString(10).includes(this.search)))
            })
        }
    },
    created(){
      this.showPacijentKarton(); //Za dobijanje podataka visina,sirina... iz zdravKartona koji dobijam uz pacijenta.
      this.getAllPregled();//Za dobjanje podataka potrebnih za popunjavanje tabele...
  }
}
</script>

<style scoped>
#filter select{
  margin-right:10px;
  border-color: #e8491d;
  background-color:#35424a
}

#filter option{
  border-bottom-color: #e8491d
}
#filter input{
  margin-right:10px;
  border-color: #e8491d;
  color:#35424a;
}
li{
  list-style: none;
 
}
ul{
   padding:0px;
}

</style>
