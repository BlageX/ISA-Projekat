<template>
<div id='patientProfile'>
    <h2 class="title">Patient Profile</h2>   
    <hr style='background:#e8491d;'>
    <div class="container">
      <form>
        <ul id="services" class="list-group">
            <li class="list-group-item">
                <h4>Ime</h4>
                <p>{{pacijent.ime}}</p>
            </li>
            
            <li class="list-group-item">
                <h4>Prezime</h4>
                <p>{{pacijent.prezime}}</p>    
            </li>

            <li class="list-group-item">
                <h4>Adresa</h4>
                <p>{{pacijent.adresa}}</p>
            </li>

              <li class="list-group-item">
                <h4>Grad</h4>
              
                <p>{{pacijent.grad}}</p>
            </li>

            <li class="list-group-item">
                <h4>Drzava</h4>
               
                <p>{{pacijent.drzava}}</p>
            </li>

            <li class="list-group-item">
                <h4>Broj telefona</h4>
              
                <p>{{pacijent.brojTelefona}}</p>
            </li>

            <li class="list-group-item">
                <h4>Broj poverioca</h4>
                
                <p>{{pacijent.brojOsiguranika}}</p>
            </li>
        </ul>

        <div id='buttonUpdate'>
          <!-- <router-link to='/patient/update'>--><button type='button' v-on:click='goToUpdateProfile()' class="btn btn-lg btn-success "> Update </button><!-- </router-link> -->
        </div>
      </form>
    </div>
</div>
</template>

<script>
import PacijentDataService from '@/services/PacijentDataService'
export default {
  name: 'PatientProfile',
  data () {
    return {
      pacijent:null,
    }
  },
  methods: {
    showPacijentProfile:function(){
      PacijentDataService.getPacijentProfile().then((response)=>{
        this.pacijent = response.data;
      });
    },
    goToUpdateProfile:function(){
       this.$router.push(`/patient/profile/update`);
    }
  },
  created(){
    this.showPacijentProfile();
  }
}

</script>

<style>
ul#services li{
    list-style: none;
    padding:15px;
    border-bottom: gray solid 1px;
    /* border-right: gray solid 1px; */
    border-radius: 15px;
    margin-bottom: 3px; 
    background-color:#fff;
    width:90%;
}
#buttonUpdate{
  float:left;
  
}
</style>
