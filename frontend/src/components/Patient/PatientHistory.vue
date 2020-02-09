<template>
<div id='PatientHistory'>
    <h2>Istorija pregleda i operacija pacijenta</h2>
    <hr style='background:#e8491d;'>
    <div class="container" >

      <div id='filter'>
        <nav class="navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand">Filtriranje pregleda</a>
            <form class="form-inline" >
            <select v-model="column"  class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <option v-bind:value="null">Kriterijumi filtriranja</option>
                <option v-for="col in cols" v-bind:key="col">{{ col }}</option>
                </select>
                <input type="text" v-model="search" placeholder="Search">
            </form>
        </nav>
      </div> 

      <table id="tabelaPregleda" class="table">
        <thead>
          <tr>
              <th v-for="col in cols" :key="col"> {{ col }} </th>  
              <th>Ocena</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td v-for="col in cols" :key="col">{{ row[col] }}</td>
            <td><a href="#ocena"> <button v-on:click='getElementForMark()' class="btn  btn-outline-warning">Oceni</button></a></td>
            </tr>
        </tbody>
      </table>

      <hr id='lineBetweenTables'>

      <div id='filter'>
        <nav class="navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand">Filtriranje operacija</a>
            <form class="form-inline">
            <select v-model="column2"  class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <option v-bind:value="null">Kriterijumi filtriranja</option>
                <option v-for="col in cols2" v-bind:key="col">{{ col }}</option>
                </select>
                <input type="text" v-model="search2" placeholder="Search">
            </form>
        </nav>
      </div> 

      <table id="tabelaOperacija" class="table">
        <thead>
          <tr>
              <th v-for="col in cols2" :key="col"><template v-if="col != 'doktori'">  {{ col }} </template>  </th>  
              <th>Doktori</th>
          </tr>
        </thead>

        <tbody>
            <tr v-for="row in rows2" :key="row.id">
              <td v-for="col in cols2" :key="col"> <!--<template v-if="col != 'doktori'"> --> {{row[col]}} <!--</template>--> </td>
              <!-- <td> -->
                <!-- <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Lista doktora
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                        <p v-bind:key='inicijali' v-for='inicijali in operacije.doktori'  class="dropdown-item"> {{inicijali[0]}}, {{inicijali[1]}}, {{inicijali[2]}} } </p> 
                  </div>
                </div>
              </td>   -->
            </tr>
        </tbody>
      </table>

      <hr>
     <div id=ocena>
        <div id=odabraniDoktor>
            <h2>Doktor:</h2>
            <p>{{this.selectedDoctor}}</p>
        </div>
        <div id='ocenaDoktor'>
          <h2>Ocena:</h2>
          <div>
            <select v-model="selectedMarkDoctor" >
              <option disabled value="">Please select one</option>
              <option v-bind:key='option.value' v-for='option in options'>{{option.value}}</option>
            </select>
            <p>{{this.selectedMarkDoctor}}</p>
          </div>
        </div>

        <div id=odabranaKlinika>
            <h2>Klinika:</h2>
            <p>{{this.selectedClinic}}</p>
        </div>

        <div id='ocenaKlinika'>
          <h2>Ocena:</h2>
          <div>
            <select v-model="selectedMarkClinic" >
              <option disabled value="">Please select one</option>
              <option v-bind:key='option.value' v-for='option in options'>{{option.value}}</option>
            </select>
            <!-- <p>{{this.selectedMarkClinic}}</p> -->
          </div>
        </div>

      <button id='potvrdiButton' class="btn btn-success">Potvrdi</button>
     </div>
    </div>
</div>
</template>

<script>
import PacijentDataService from '@/services/PacijentDataService'
export default {
  name: 'PatientHistory',
  data () {
    return {

        search: null,
        column: null,
        items: [],

        search2: null,
        column2: null,
      
        selectedDoctor: null, 
        selectedMarkDoctor: null,

        selectedClinic: null,
        selectedMarkClinic:null,
        
        // doktori:(JSON.parse(JSON.stringify(this.doktori))),
        options: [
          // { value: null, text: 'Please select some item' },
          { value: '1', text: 'Dali ste ocenu 1' },
          { value: '2', text: 'Dali ste ocenu 2' },
          { value: '3', text: 'Dali ste ocenu 3' },
          { value: '4', text: 'Dali ste ocenu 4' }, //, disabled: true 
          { value: '5', text: 'Dali ste ocenu 5' },
        ],

        //ovde hardkodovano kada budem radio preko url samo staviti ptrlhr :[]
        pregledi:[],
        sviPregledi:[],
        redUTabeli: {
              id:'',
              datum:'',
              vreme:'',
              tipPregleda:'',
              trajanjePregleda:'',
              sala:'',
              doktor:'',
              cena:'',
        },
        operacije:[],
        sveOperacije:[],
        redUTabeliOperacija: {
          id:'',
          datum:'',
          vreme:'',
          trajanjeOperacije:'',
          sala:'',
          doktori:'', 
          cena:'',
        },
    }
  },
  methods: {
    getElementForMark:function(e){
      this.selectedDoctor = e.target.parentElement.lekar.value;
      // console.log(e.target.parentElement.lekar.value);
      this.selectedClinic = e.target.parentElement.sala.value; //ovde sam stavio sala ali treba klinika koju ili da dobijam 
      // preko upita daj mi kliniku gde radi ovaj liekar ili da je vec u tabeli kao podatak pa je samo pokupim...
    },

    refreshTabelaPregleda:function(){
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
        this.redUTabeli.cena = pregled.cena;
        this.redUTabeli.trajanjePregleda = pregled.trajanje;
        this.redUTabeli.tipPregleda = pregled.tipPregleda.naziv;
        this.redUTabeli.doktor = pregled.doktor.ime + ' ' + pregled.doktor.prezime;
        this.redUTabeli.sala =  pregled.sala.naziv + " br. " + pregled.sala.broj;

        this.pregledi.push(JSON.parse(JSON.stringify(this.redUTabeli)));
      });
    },

    refreshTabelaOperacija:function(){
      PacijentDataService.getAllOperacija().then((response)=>{
        this.sveOperacije = response.data;
        this.showOperacije(this.sveOperacije);
      });
    },

    showOperacije:function(sveOperacijePros){
      sveOperacijePros.forEach(operacija => {
        this.redUTabeliOperacija.id = operacija.id;
        this.redUTabeliOperacija.datum = operacija.datum;
        this.redUTabeliOperacija.vreme = operacija.vreme;
        this.redUTabeliOperacija.cena = operacija.cena;
        this.redUTabeliOperacija.trajanjeOperacije = operacija.trajanje + ' h';
        //this.redUTabeliOperacija.tipPregleda = operacija.tipPregleda.naziv;
        this.redUTabeliOperacija.doktori = this.takeOutDoktorData(operacija.doktori);
        this.redUTabeliOperacija.sala =  operacija.sala.naziv + " br. " + operacija.sala.broj;

        this.operacije.push(JSON.parse(JSON.stringify(this.redUTabeliOperacija)));
      });
    },
    
    takeOutDoktorData:function(doktori){
      let povrNizDoktora = [];
      doktori.forEach(doktor => {
        povrNizDoktora.push(doktor.ime + ' ' + doktor.prezime);
      });

      return povrNizDoktora;

    },

    // takeOutDoktorName:function(doktori){
    //   let povrNizImenaDoktora = [];
    //   doktori.forEach(doktor => {
    //     povrNizImenaDoktora.push();
    //   });    

    //   return povrNizImenaDoktora;
    // }
  },
  computed:{
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
        },

      //Za tabelu operacija:
        cols2 () {
        return this.operacije.length >= 1 ? Object.keys(this.operacije[0]) : []
         },
        rows2 () {
            if (!this.operacije.length) {
                return []
            }
        
            return this.operacije.filter(operacija => {
                let props = (this.search2 && this.column2) ? [operacija[this.column2]] : Object.values(operacija)
            
            return props.some(prop => !this.search2 || ((typeof prop === 'string') ? prop.includes(this.search2) : prop.toString(10).includes(this.search2)))
            })
        }
    },
  created(){
    this.refreshTabelaPregleda();
    this.refreshTabelaOperacija();
  }
}
</script>

<style scoped>
#ocena{
  position: relative;
  background-color: #f0ecec;
  padding: 130px;
}

#ocena #odabraniDoktor{
  position: absolute;
  left: 30px;
  top:  20px
}

#ocena #ocenaDoktor{
  position: absolute;
  right: 120px;
  top:  20px
}

#ocena #odabranaKlinika{
  position: absolute;
  left: 30px;
  top:  110px
}
#ocena #ocenaKlinika{
  position: absolute;
  right: 120px;
  top:  90px
}

#ocena #potvrdiButton{
  position: absolute;
  right: 120px;
  bottom: 15px;
}

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

#lineBetweenTables{
  border:solid 1px #e8491d;
}
</style>