<template>
  <div>
    <h3>Course</h3>
    <div class="container">
      <form @submit="validateAndSubmit">
        <div v-if="errors.length">
          <div
            class="alert alert-warning"
            v-bind:key="index"
            v-for="(error, index) in errors"
        ></div> 
        </div>
        <fieldset class="form-group">
          <label>Id</label>
          <input type="text" class="form-control" v-model="id" disabled />
        </fieldset>
        <fieldset class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="this.odabrani_radnik.ime" />
          <label>Surname</label>
          <input type="text" class="form-control" v-model="this.odabrani_radnik.prezime" />
          <label>Age</label>
          <input type="text" class="form-control" v-model="this.odabrani_radnik.godine" />
        </fieldset>
        <button class="btn btn-success" type="submit" >Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import RadnikDataService from '../services/RadnikDataService'

export default {
  name: 'RadnikDetails',
  components: {

  },
  data:function(){
    return{
        odabrani_radnik:{
            ime:'',
            prezime:'',
            godine:''
        },
        errors:[],
    }
  },
  computed:{
    id() {
        return this.$route.params.id;
    },
  },
  methods:{
      refreshRadnik(){
          RadnikDataService.getRadnik(this.id).then((res)=>{
              this.odabrani_radnik.ime=res.data.ime;
              this.odabrani_radnik.prezime=res.data.prezime;
              this.odabrani_radnik.godine=res.data.godine;
          });
      },
        validateAndSubmit(e) {
            e.preventDefault();
            this.errors = [];
            if (!this.ime) {
                this.errors.push("Enter valid values");
            } else if (this.ime.length < 2) {
                this.errors.push("Enter atleast 2 characters in Name");
            }
            
            if (!this.godine) {
                this.errors.push("Enter valid values");
            } else if (this.godine < 0) {
                this.errors.push("Age can't be negative");
            }

            if (this.errors.length === 0) {
                if (this.id === -1) {
                    RadnikDataService.createRadnik( {
                        ime:this.odabrani_radnik.ime,
                        prezime:this.odabrani_radnik.prezime,
                        godine:this.odabrani_radnik.godine,
                    }).then(() => {
                        this.$router.push("/radniks");
                    });
                }else {
                    RadnikDataService.updateRadnik(this.id , {
                    //Drugi parametar je objekat koji zelim da sacuvam.
                    id:this.id ,//id koji smo preuzeli iz putanje urla preko computed id()
                    ime:this.odabrani_radnik.ime,
                    prezime:this.odabrani_radnik.prezime,
                    godine:this.odabrani_radnik.godine,
                    }).then(()=>{
                        this.$router.push("/radniks"); //vrati na listu radnika nakon update
                    });
                }
            }
        }
  },
  created(){
      this.refreshRadnik();
  }
}
</script>

<style scoped>

</style>
