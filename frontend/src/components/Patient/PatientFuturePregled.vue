<template>
    <div id='PatientPredefPregled' class='container'>
    <h1 class="my-4">Zakazani pregledi
  </h1>
    <hr>
    <div class="alert alert-success" v-if='message' v-html="message"> </div>
     <div class="alert alert-danger" v-if='errorMessage' v-html="errorMessage"> </div>
    <div class="row">  
        <div class="col-lg-3 col-md-4 col-sm-6 mb-5"  v-bind:key='zakazaniPregled' v-for='zakazaniPregled in zakazaniPregledi'>
            <div class="card h-100" >
                <div class="card-body">
                   
                    <p>Datum: {{zakazaniPregled.datum[2]}}/{{zakazaniPregled.datum[1]}}/{{zakazaniPregled.datum[0]}}</p>
                
                    <hr>
                    <p>Vreme: {{zakazaniPregled.vreme[0]}}:{{zakazaniPregled.vreme[1]}}</p>
                
                    <hr>
                    <p>Sala:{{zakazaniPregled.sala.naziv}}</p>
                
                    <hr>
                    <p>Tip pregleda:{{zakazaniPregled.tipPregleda.naziv}}</p>
                
                    <hr>
                    <p>Lekar:{{zakazaniPregled.doktor.ime}} {{zakazaniPregled.doktor.prezime}}</p>
                    
                    <hr>
                    <p>Cena:{{zakazaniPregled.cena}}</p>

                    <h4 class="card-title">
                        <button type='button' v-on:click='otkaziPregled(zakazaniPregled)' class="btn button_1" id='btnRegistration'> Otkaži pregled </button>
                    </h4>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import PacijentDataService from '@/services/PacijentDataService'
export default {
  name: 'PatientPredefPregled',
  data () {
    return {
            zakazaniPregledi:[],
            message:'',
            errorMessage:'',
        }
    },
    methods: {
        getPacijentZakazaniPregledi:function(){
            PacijentDataService.getPacijentZakazaniPregledi().then((response)=>{
                this.zakazaniPregledi = response.data;
            });
        },

        otkaziPregled:function(zeljeniPregled){
            if(confirm('Da li zelite da otkazete pregled?')){
                    PacijentDataService.otkaziPregled(zeljeniPregled).then(()=>{
                        this.message = '<h5>Uspesno ste otkazali pregled!</h5>'
                        this.getPacijentZakazaniPregledi();
                        setTimeout(()=>this.message='',3000);
                }).catch(error => {
                    if(error.response.status === 400){
                        this.errorMessage = `<h5>Ne mozete otkazati pregled jer je ostalo manje od jednog dana!</h5>
                        <h5>Vi ste "obavili" pregled.On se sada nalazi u vasoj istoriji pregledai, dok detalje ovog pregleda mozete pogledati i kartonu pacijenta!</h5>`;
                        setTimeout(()=>this.errorMessage='',10000);
                    }
                });
            }
        }
    },
    created(){
        this.getPacijentZakazaniPregledi();
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
</style>