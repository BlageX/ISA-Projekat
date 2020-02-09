<template>
<div id='PatientOverview'>
    <h2>Potvrda zakazanog pregleda</h2>
    
    <hr style='background-color:#e8491d;'>
    <div id='pacijentPodaci'>
        <h4>Datum:</h4>
        <p>{{pregledPotvrda.datum[1]}}/{{pregledPotvrda.datum[2]}}/{{pregledPotvrda.datum[0]}}</p>
        <hr>
        <h4>Vreme:</h4>
        <p>{{pregledPotvrda.vreme}}</p>
        <hr>
        <h4>Klinika:</h4>
        <p>{{pregledPotvrda.klinika}}</p>
        <hr>
        <h4>Tip pregleda:</h4>
        <p>{{pregledPotvrda.tipPregleda}}</p>
        <hr>
        <h4>Doktor:</h4>
        <p>{{pregledPotvrda.doktor}}</p>
        <hr>
        <h4>Cena:</h4>
        <p>{{pregledPotvrda.cena}}</p>
    </div>
    <div id='buttonsField'>
       <button v-on:click='goToPreviousPage()' class="btn btn-lg btn-danger"> Odustani </button>
        <!--<router-link to='/patient/clinicList/profile/'>--> <button v-on:click='sendRequest()' class="btn btn-lg btn-success"> Potvrdi </button> <!--</router-link>-->
    </div>
   
</div>
</template>

<script>
import PacijentDataService from '@/services/PacijentDataService'
export default {
  name: 'PatientPotvrdaZakazanogPregleda',
  data () {
    return {
        termin_id:null,
        test:'',
        pregledPotvrda:{
            datum:[],
            vreme:'',
            tipPregleda:'',
            doktor:'',
            cena:'',
            nazivKlinike:'',
           // idTermina:null,
        },
      
    }
  },
  methods: {
    showOverview:function(){
        PacijentDataService.getOverview(this.termin_id).then((response)=>{
            this.pregledPotvrda.datum = response.data.datum; 
            this.pregledPotvrda.vreme = response.data.vreme; 
            this.pregledPotvrda.tipPregleda = response.data.tipPregleda; 
            this.pregledPotvrda.doktor = response.data.doktor; 
            this.pregledPotvrda.cena = response.data.cena; 
            this.pregledPotvrda.klinika = response.data.nazivKlinike;
        });
    },
    sendRequest:function(){
        PacijentDataService.potvrdiPregled(this.termin_id).then( ()=>{
            this.$router.push(`/patient/zakazaniPregledi`);
        });
    },
    goToPreviousPage(){
        if(confirm('Da li ste sigurni da zelite odustati?')){
            this.$router.push('/patient/clinicList');
        }
    }

  },
    created(){
        this.termin_id = this.$route.params.termin_id;
        this.showOverview();
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
</style>
