<template>
<div id='PatientClinicProfile'>
    <h2>Profil klinike</h2>
    <hr style='background-color:#e8491d;'>
    <div id='pacijentPodaci'>
        <h4>Id:</h4>
        <p>{{id}}</p>
        <hr>
        <h4>Naziv:</h4>
        <p>{{klinika.naziv}}</p>
        <hr>
        <h4>Adresa:</h4>
        <p>{{klinika.adresa}}</p>
        <hr>
        <h4>Opis:</h4>
        <p>{{klinika.opis}}</p>
        <hr>
        <!-- tooltip kliniknite za brz odabir predefinisanih pregleda -->
        <h4>Slobodni termini:</h4>
        <button v-on:click='goToPredefPreglediList(id)' class="btn btn-outline-warning">Predefinisani slobodni termini</button>
        <hr>
        <h4>Spisak lekara:</h4>
        <button v-on:click='goToDoktorList(id)' class="btn  btn-outline-warning">Lekari</button>
        
        <hr>
        <h4>Spisak sala:</h4>
        <ul id='spisakSala'>
            <li v-bind:key="sala.id" v-for="sala in spisakSala">{{ sala.naziv }} - br. sale {{ sala.broj}}  </li>
        </ul> 
        <hr>
        <h4>Cenovnik:</h4>
        <!-- {{splitPregledCena(klinika.cene)}} -->
         <ul id='cenovnik'>
             <li>Tip pregleda : Cena</li>
            <li v-bind:key="usluga" v-for="usluga in this.tipoviPregleda">{{ usluga.naziv }} : {{usluga.cena}} din </li>
        </ul>

    </div>
    <div id='buttonsField'>
    
    </div>
   
</div>
</template>

<script>
// import axios from 'axios'
import KlinikaDataService from '@/services/KlinikaDataService'
export default {
    
  name: 'PatientClinicProfile',
    data () {
        return {
            klinika:{
                naziv:'',
                adresa:'',
                opis:'',
                cene:''
            },
            cenovnikZaPrikaz:[],
            tipoviPregleda:[],
            spisakSala:[],
        }
    },
    computed:{
        id() {
            return this.$route.params.id; //preuzimam id klinike na cijoj sam profilnoj stranici:
        }
    },
    methods: {
        refreshThisKlinika(){
            KlinikaDataService.getKlinika(this.id).then((response)=>{
                this.klinika.naziv = response.data.naziv;
                this.klinika.adresa = response.data.adresa;
                this.klinika.opis = response.data.opis;
                this.klinika.spisakSala = response.data.sale;
                this.klinika.cene = response.data.cene;
            });
        },
        getTipPregledaByKlinika(){
            KlinikaDataService.getTipPregledaByKlinikaId(this.id).then((response)=>{
                this.tipoviPregleda = response.data;
            });
        },
        getAllSaleByKlinikaId(){
            KlinikaDataService.getAllSaleByKlinikaId(this.id).then((response)=>{
                this.spisakSala = response.data;
            });
        },

        goToDoktorList:function(id){
            this.$router.push(`/patient/clinicList/profile/${id}/doctorList`);
        },
        goToPredefPreglediList:function(id){
            this.$router.push(`/patient/clinicList/profile/${id}/predefPregledi`);
        },
        splitPregledCena:function(stringToSplit){
          this.cenovnikZaPrikaz = stringToSplit.split(';');
        },

    },
    created(){
        this.refreshThisKlinika();
        this.getTipPregledaByKlinika();
        this.getAllSaleByKlinikaId();
    }
}
</script>

<style scoped>
#buttonsField{
    float:right;
   
}
#buttonsField button{
    margin: 10px;
}
#spisakSala{
   margin:0;
   padding:0;
}
#spisakSala li{
    /*ili float:left;
    display:inline;*/
    padding:0 10px 2px 0px;
    list-style: none;
}

#cenovnik{
   margin:0;
   padding:0;
}
#cenovnik li{
    padding:0 10px 0 10px;
    list-style: none;
}

</style>
