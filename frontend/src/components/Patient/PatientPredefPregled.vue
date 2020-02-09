<template>
    <div id='PatientPredefPregled' class='container'>
    <h1 class="my-4"> Predefininsani pregledi </h1>
    <hr>
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 mb-5"  v-bind:key='pregledPotvrda' v-for='pregledPotvrda in predefinisanPregled'>
                <!-- {{this.hideBlock(pregledPotvrda.pacijent)}}
                <template v-bind:class="{ hide: this.pacijentIsNotNull }">  -->
                <!-- <template v-if='pregledPotvrda.pacijent === null'> -->
                    <div class="card h-100" >
                        <div class="card-body" >
                    
                            <p>Datum: {{pregledPotvrda.datum[2]}}/{{pregledPotvrda.datum[1]}}/{{pregledPotvrda.datum[0]}}</p>
                        
                            <hr>
                            <p>Vreme: {{pregledPotvrda.vreme[0]}}:{{pregledPotvrda.vreme[1]}}</p>
                        
                            <hr>
                            <p>Sala:{{pregledPotvrda.sala.naziv}}</p>
                        
                            <hr>
                            <p>Tip pregleda:{{pregledPotvrda.tipPregleda.naziv}}</p>
                        
                            <hr>
                            <p>Lekar:{{pregledPotvrda.doktor.ime}} {{pregledPotvrda.doktor.prezime}}</p>
                            
                            <hr>
                            <p>Cena:{{pregledPotvrda.cena}}</p>

                            <h4 class="card-title">
                                <button type='button' v-on:click='zakaziPregled(pregledPotvrda)' class="btn button_1" id='btnRegistration'>Odaberi pregled </button>
                            </h4>
                        </div>
                    </div>
                <!-- </template>   -->
            </div> 
        </div>
    </div>
</template>

<script>
import KlinikaDataService from '@/services/KlinikaDataService'
import PacijentDataService from '@/services/PacijentDataService'
export default {
  name: 'PatientPredefPregled',
  data () {
    return {
        //ne treba klinika jer smo vec u njenom profilu
            predefinisanPregled:[],
            pacijentIsNotNull:false,
    }
  },  
    methods: {
        getPreglediFromKlinika:function(){
            KlinikaDataService.getPreglediInKlinika(this.id).then((response)=>{
                this.predefinisanPregled = response.data;
            });
        },
        //ova metoda treba biti na tranici OverviewPregled, a klikom na gornje dugme se treba doci do te stranice.
        zakaziPregled:function(zeljeniPregled){
            PacijentDataService.zakaziPregled(zeljeniPregled).then(()=>{
                this.$router.push(`/patient/zakazaniPregledi`);
            });
        }

    },
    computed:{
        id() {
            return this.$route.params.id; //preuzimam id klinike na cijoj sam profilnoj stranici:
        }
    },
    created(){
        this.getPreglediFromKlinika();
    }
}

</script>

<style>
.button_1{
    height:38px;
    background-color:#e8491d;
    color:#fff;
    border:none;
    padding: 0 20px;
}


.button_1:hover{
    background-color:#cccccc;
    color:#fff;
    
}

.hide{
    display:none;
}
</style>