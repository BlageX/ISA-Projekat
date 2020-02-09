<template>
    <div id='patientProfile'>
        <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Neon Button
        </a>
       <!-- <h3>Course</h3>
        <div class="container">
                <fieldset class="form-group">
                    <label>Id</label>
                    <input type="text" class="form-control" v-model="id" disabled />
                </fieldset>
                <fieldset class="form-group">
                    <label>Broj osiguranika</label>
                    <input type="text" class="form-control" v-model="this.brOsig"  disabled/>
                </fieldset>
                <fieldset class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="this.email"  disabled/>
                </fieldset>
                <fieldset class="form-group">
                    <label>Ime</label>
                    <input type="text" class="form-control" v-model="this.ime" />
                </fieldset>
                <fieldset class="form-group">
                    <label>Prezime</label>
                    <input type="text" class="form-control" v-model="this.prezime" />
                </fieldset>
                <fieldset class="form-group">
                    <label>Adresa</label>
                    <input type="text" class="form-control" v-model="this.adresa" />
                </fieldset>
                <fieldset class="form-group">
                    <label>Grad</label>
                    <input type="text" class="form-control" v-model="this.grad" />
                </fieldset>
                <fieldset class="form-group">
                    <label>Drzava</label>
                    <input type="text" class="form-control" v-model="this.drzava" />
                </fieldset>
                <fieldset class="form-group">
                    <label>Broj telefona</label>
                    <input type="text" class="form-control" v-model="this.brTel" />
                </fieldset>
    


            <button class="btn btn-success" type="submit" >Save</button>
        </div>-->
    </div>
</template> 


<script>
// export default {
//     name: 'PatientProfileUpdate',
//     data:function(){
//         return{
//           ime: '',
//           prezime: '',
//           adresa: '',
//           grad: '',
//           drzava: '',
//           brTel: '',
//           brOsig: '',
//           email: '',
//         }
//     },
//     methods:{
//     //      refreshRadnik(){
//     //       RadnikDataService.getRadnik(this.id).then((res)=>{
//     //           this.odabrani_radnik.ime=res.data.ime;
//     //           this.odabrani_radnik.prezime=res.data.prezime;
//     //           this.odabrani_radnik.godine=res.data.godine;
//     //       });
//     //   },
//     },
//     // computed:{
//     //     id() {
//     //         return this.$route.params.id; //ili token ili username i password...
//     //     },
//     // },
//     // created(){
//     //   this.refreshRadnik();
//     // }
// }
</script> 

<style scoped>
body{

  margin: 0;

  padding: 0;

  display: flex;

  justify-content: center;

  align-items: center;

  min-height: 100vh;

  background: #031321;

  font-family: consolas;

}

a{

  position: relative;

  display: inline-block;

  padding: 15px 30px;

  color: #2196f3;

  text-transform: uppercase;

  letter-spacing: 4px;

  text-decoration: none;

  font-size: 24px;

  overflow: hidden;

  transition: 0.2s;

}

a:hover{

  color: #255784;

  background: #2196f3;

  box-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3;

  transition-delay: 1s;

}

a span{

  position: absolute;

  display: block;

}

a span:nth-child(1)  {

  top: 0;

  left: -100%;

  width: 100%;

  height: 2px;

  background: linear-gradient(90deg,transparent,#2196f3);

}

a:hover span:nth-child(1) {

  left: 100%;

  transition: 1s;

}

a span:nth-child(3) {

  bottom: 0;

  right: -100%;

  width: 100%;

  height: 2px;

  background: linear-gradient(270deg,transparent,#2196f3);

}

a:hover span:nth-child(3) {

  right: 100%;

  transition: 1s;

  transition-delay: 0.5s;

}

a span:nth-child(2) {

  top: -100%;

  right: 0;

  width: 2px;

  height: 100%;

  background: linear-gradient(180deg,transparent,#2196f3);

}

a:hover span:nth-child(2) {

  top: 100%;

  transition: 1s;

  transition-delay: 0.25s;

}

a span:nth-child(4) {

  bottom: -100%;

  left: 0;

  width: 2px;

  height: 100%;

  background: linear-gradient(360deg,transparent,#2196f3);

}

a:hover span:nth-child(4) {

  bottom: 100%;

  transition: 1s;

  transition-delay: 0.75s;

} 
</style>











