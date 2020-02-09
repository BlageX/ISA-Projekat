<template>
    <div id='PacijentProfilUpdate'>
        <h2>Izmeni profil</h2>
        <hr style='background-color:#e8491d;'>
        <div class="container">
            <!-- <fieldset class="form-group">
                <label>Id</label>
                <input type="text" class="form-control" v-model="this.pacijent.id" disabled />
            </fieldset> -->
            <fieldset class="form-group">
                <label>Broj osiguranika</label>
                <input type="text" class="form-control" v-model="this.pacijent.brojOsiguranika"  disabled/>
            </fieldset>
            <fieldset class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" v-model="pacijent.email"  disabled/>
            </fieldset>
            <fieldset class="form-group">
                <label>Ime</label>
                <input type="text" class="form-control" v-model="pacijent.ime" />
            </fieldset>
            <fieldset class="form-group">
                <label>Prezime</label>
                <input type="text" class="form-control" v-model="pacijent.prezime" />
            </fieldset>
            <fieldset class="form-group">
                <label>Adresa</label>
                <input type="text" class="form-control" v-model="pacijent.adresa" />
            </fieldset>
            <fieldset class="form-group">
                <label>Grad</label>
                <input type="text" class="form-control" v-model="pacijent.grad" />
            </fieldset>
            <fieldset class="form-group">
                <label>Drzava</label>
                <input type="text" class="form-control" v-model="pacijent.drzava" />
            </fieldset>
            <fieldset class="form-group">
                <label>Broj telefona</label>
                <input type="text" class="form-control" v-model="pacijent.brojTelefona" />
            </fieldset>

              <button type="button" class="btn btn-lg btn-success" v-on:click='updatePacijentProfile'> Save </button>
        </div>
    </div>
</template>


<script>
import PacijentDataService from '@/services/PacijentDataService'
export default {
  name: 'PacijentProfileUpdate',
	data() {
      return {
        // pacijent:null,
        pacijent: {
          id:'',
          ime:'',
          username:'',
          password:'',
          prezima:'',
          adresa: '',
          grad: '',
          drzava: '',
          brojTelefona: '',
          brojOsiguranika: '',
          email: '',
      },
    }
  },
  methods:{
    refreshProfilePacijent:function(){
        PacijentDataService.getPacijentProfile().then((response)=>{
         //this.pacijent = response.data;
          this.pacijent.id = response.data.id;
          this.pacijent.ime = response.data.ime;
          this.pacijent.username = response.data.username;
          this.pacijent.password = response.data.password;
          this.pacijent.prezime = response.data.prezime;
          this.pacijent.adresa = response.data.adresa;
          this.pacijent.grad = response.data.grad;
          this.pacijent.drzava = response.data.drzava;
          this.pacijent.brojTelefona = response.data.brojTelefona;
          this.pacijent.brojOsiguranika = response.data.brojOsiguranika;
          this.pacijent.email = response.data.email;
        });
    },
    updatePacijentProfile:function(){
        PacijentDataService.updatePacijentProfile({
          id:this.pacijent.id,
          username:this.pacijent.username,
          password:this.pacijent.password,
          ime:this.pacijent.ime,
          prezime:this.pacijent.prezime,
          adresa:this.pacijent.adresa,
          grad:this.pacijent.grad,
          drzava:this.pacijent.drzava,
          brojTelefona:this.pacijent.brojTelefona,
          brojOsiguranika:this.pacijent.brojOsiguranika,
          email:this.pacijent.email,
        }).then(() => {
          this.$router.push(`/patient/profile`);
     });
    }
  },
  created(){
    this.refreshProfilePacijent();
  }
 }
</script>

<style scoped>
.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>