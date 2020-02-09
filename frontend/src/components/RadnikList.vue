<template>
  <div class="container">
    <h3>All Radnici</h3>
    <div class="alert alert-success" v-if='message'> {{message}} </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key='radnik.id' v-for='radnik in radnici'>
            <td>{{radnik.id}}</td>
            <td>{{radnik.ime}}</td>
            <td>{{radnik.prezime}}</td>
            <td>{{radnik.godine}}</td>
            <td><button class="btn btn-warning" v-on:click='deleteRadnikClicked(radnik.id)'>Delete</button></td>
            <td><button class="btn btn-success" v-on:click="updateRadnikClicked(radnik.id)">Update</button></td>
          </tr>
          <!-- At the end of table -->
          <div class="row">
              <button class="btn btn-success" v-on:click="addRadnikClicked()">Add</button>
          </div>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import RadnikDataService from '../services/RadnikDataService'
export default {
  name: "RadnikList",
  data(){
    return{
      radnici:[],
      message:null,
    }
  },
  methods:{
      refreshRadnici(){
        RadnikDataService.getAllRadniks().then((response)=>{
          this.radnici = response.data;
        });
      },
      deleteRadnikClicked(id){
        RadnikDataService.deleteRadnik(id).then(()=>{
          this.message = `You succesfully delete ${id} radnik`;
          this.refreshRadnici();
        });
      },

      updateRadnikClicked(id){
        // kada hocu da pristupim jednom radniku kucam:
        // http://localhost8080/radniks/1 to je bukvanlno ono sto sam ovde dole rekao
        // kada klikne na update idi na adresu tog elementa i prikazi samo njega. 

        //RadnikDataService.updateRadnik(id).then(()=>{... Ce biti pozvano u RadnikDetails koji se otvara na donjem linku
        this.$router.push(`radniks/${id}`)
      },
      addRadnikClicked(){
        this.$router.push(`radniks/-1`);
      }
  },
  //Da se sim se pokrene stranica ucitaju svi radnici
  created(){
    this.refreshRadnici();
  }

};
</script>

<style>
</style>