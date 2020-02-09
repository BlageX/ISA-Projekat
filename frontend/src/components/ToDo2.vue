<template>
    <div id='ListOfClinics'>
        <h2>Lista klinika</h2>
        <hr style='background:orange;'>

        <div class="container" >

            <div id='filter'>
                <nav class="navbar navbar-light bg-light justify-content-between">
                    <a class="navbar-brand">Filtriranje</a>
                    <form class="form-inline">
                    <select v-model="column"  class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">>
                        <option v-bind:value="null">No Column Filter</option>
                        <option v-for="col in cols" v-bind:key="col">{{ col }}</option>
                        </select>
                        <input type="text" v-model="search" placeholder="Search">
                    </form>
                </nav>
            </div> 
            <div id="vue-table">
            <table  class="table">
                <thead>
                <tr>
                    <th v-for="col in cols" :key="col">
                        <a href="#" v-on:click="sortBy(column)" v-class:active=" sortKey == column">
                            {{ col }} 
                        </a>    
                    </th>
                    <th>Profil klinike</th>
                    <th>Lista lekara</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in rows" :key="row.id">
                    <td v-for="col in cols" :key="col">{{ row[col] }}</td>
                    <td><router-link to='/patient/clinicList/profile'> <button v-on:click='getElementForMark()' class="btn btn-outline-secondary">Profil klinike</button></router-link></td>
                    <td><router-link to='/patient/clinicList/doctorList'><button v-on:click='getElementForMark()' class="btn btn-outline-warning">Lista lekara</button></router-link></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name:'ListOfClinics',
	data() {
      return {
        //filtriranje:
        search: null,
        column: null,
        items: [],

        //sortiranje:
        sortKey: 'name',
        reverse: false,


        klinike:[
          {
            id:1,
            naziv:'Klinik 1',
            adresa:'Ulica 12',
            prosOcena:'4',
            cenaOrig:1500,  //cena pregleda
            cenaPopust:1000,
          },
           {
            id:2,
            naziv:'Klinik 2',
            adresa:'Ulica 36',
            prosOcena:'4',
            cenaOrig:1500,  //cena pregleda
            cenaPopust:'',
          },
           {
            id:3,
            naziv:'Klinik 3',
            adresa:'Ulica 23',
            prosOcena:'4',
            cenaOrig:2500,  //cena pregleda
            cenaPopust:2000,
          },
        ]
      }
  },
  methods: {

    sortBy: function(sortKey) {
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;

      this.sortKey = sortKey;
    },
  },
  computed: {
        cols () {
        return this.klinike.length >= 1 ? Object.keys(this.klinike[0]) : []
         },
        rows () {
            if (!this.klinike.length) {
                return []
            }
        
            return this.klinike.filter(klinika => {
                let props = (this.search && this.column) ? [klinika[this.column]] : Object.values(klinika)
            
            
                return props.some(prop => !this.search || ((typeof prop === 'string') ? prop.includes(this.search) : prop.toString(10).includes(this.search)))
            })
        }
    },
}
</script>

<style scoped>
#vue-table {
    margin: 2em 0;
}
#vue-table  a {
  font-weight: normal;
  color: blue;
}
#vue-table  a.active {
  font-weight: bold;
  color: black;
}
</style>