<template>
    <div id='PatientKartonDetails'>
        <h1 class="mt-4">Detalji pregleda</h1>

         <hr style='background-color:#e8491d;'>
        <div class="container-fluid">
            <div id='pacijentPodaci'>
                <h4>Datum:</h4>
                <p>{{kartonPacijenta.datum}}</p>
                <hr>
                <h4>Vreme:</h4>
                <p>{{kartonPacijenta.vreme}}</p>
                <hr>
                <h4>Tip pregleda:</h4>
                <p>{{kartonPacijenta.tipPregleda}}</p>
                <hr>
                <h4>Lekar:</h4>
                <p>{{kartonPacijenta.doktor}}</p>
                <hr>
                <h4>Medicinska sestra:</h4>
                <p>{{kartonPacijenta.sestra}}</p>
                <hr>
                <h4>Dijagnoza:</h4>
                <p>{{kartonPacijenta.dijagnoza}}</p>
                <hr>
                <h4>Opis pregleda:</h4>
                <p>{{kartonPacijenta.opisPregleda}}</p>
                <hr>
                <h4>Dodatni pregled:</h4>
                <p>{{kartonPacijenta.dodatniPregled}}</p>
                <hr>
                <h4>Recept:</h4>
                <ul>
                    <li v-bind:key="lek" v-for="lek in kartonPacijenta.recept">{{lek.naziv}}</li>
                </ul>
        
            </div>
        </div>
    </div>
</template>

<script>
import PacijentDataService from '@/services/PacijentDataService'
export default {
    name:'PatientKartonDetails',
    data () {
        return {
            kartonPacijenta:{
                id:'',
                datum:'',
                vreme:'',
                tipPregleda:'',
                trajanjePregleda:'',
                sala:'',
                doktor:'',
                sestra:'',
                dijagnoza:'',
                recept:null,
                dodatniPregled:false,
                dodatnaOperacija:false,
                opisPregleda:'',
                cena:'',
            }

        }
    },
    computed:{
        id() {
            return this.$route.params.id; //preuzimam id pregleda na cijoj sam stranici izvestaju pregleda:
        }
    },
    methods: {
        refreshThisKartonDetails:function(){
            PacijentDataService.getPregled(this.id).then((response)=>{
                this.kartonPacijenta.id = response.data.id;
                this.kartonPacijenta.datum = response.data.datum;
                this.kartonPacijenta.vreme = response.data.vreme;
                this.kartonPacijenta.cena = response.data.cena;
                this.kartonPacijenta.trajanjePregleda = response.data.trajanje;
                this.kartonPacijenta.tipPregleda = response.data.tipPregleda.naziv;
                this.kartonPacijenta.sala = response.data.sala.naziv + "br. " + response.data.sala.broj;
                this.kartonPacijenta.doktor = response.data.doktor.ime + ' ' +  response.data.doktor.prezime;
                //izvestaj pregleda:
                this.kartonPacijenta.opisPregleda = response.data.izvPregleda.opisPregleda;
                this.kartonPacijenta.sestra = response.data.izvPregleda.recept.medSestra.ime + ' ' + response.data.izvPregleda.recept.medSestra.prezime;
                this.kartonPacijenta.dijagnoza = response.data.izvPregleda.dijagnoza.naziv;
                this.kartonPacijenta.recept = response.data.izvPregleda.recept.lekovi;
            });
        }
    },
    created(){
      this.refreshThisKartonDetails();
  }
}
</script>