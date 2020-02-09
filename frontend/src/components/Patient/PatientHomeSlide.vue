<template>
  <div id='ToDo3'>
      <div class="container-fluid">
        <h1 class="mt-4">Dobrodošli {{pacijent.ime}}</h1>
        <p>Ovo je početna stranica vaše aplikacije. Sav sadržaj biće prikazan u okviru ovog prozora. Prikaz sadržaja se može proširiti klikom na dugme Toggle Menu kojim će se uvući bočni meni. Ponovnim klikom na to dugme meni će se ponovo pojaviti.</p>
        <p>U okviru menija sa leve strane ekrana nalaze se opcije:</p> 
        <p><b>Lista klinika</b> koja daje listu svih klinika i njihovih lekara koje možete fitrirati i na osnovu njih zakazati željeni pregled. U okviru profila klinike (kojem ovde takođe možete pristupiti) možete odabrati predefinisane preglede. </p>
        <p><b>Istorja bolesti</b> u okviru koje se prikazuje lista svih prethodnih poseta lekaru, bilo da su u pitanju pregledi ili operacije. Ovde možete izvršiti ocenjivanje lekara i/ili klinika.</p>
        <p><b>Karton</b> u kojoj se nalaz karton pacijenta kao i izveštaj svih prethodnih pregleda.</p> 
        <p><b>Profil</b> u okviru koje se nalazi prikaz vaših ličnih podataka, koje možete menjati.</p>

        U gornjem desnom uglu (u nivou Toggle Menu) imate opcije <b>Home</b>  koja će vas vratiti na ovu stranicu kao i opciju <b>Zakazani pregledi</b> odabirom koje dobijate prikaz svih budućih pregleda koje ste zakazali. 
      </div>
  </div>
</template>

<script>
import PacijentDataService from '@/services/PacijentDataService'
export default {
	data() {
      return {
        pacijent:null,
       
      }
  },
  methods: {
    showPacijentProfile:function(){
      PacijentDataService.getPacijentProfile().then((response)=>{
        this.pacijent = response.data;
      });
    }
  },
  created(){
    this.showPacijentProfile();
  }
}
</script>