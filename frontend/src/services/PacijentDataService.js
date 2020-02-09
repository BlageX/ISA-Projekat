// 1. Import axios
import axios from "axios";

// 2. Definisati 2 url

const API_URL = "http://localhost:8080";
const PACIJENT_API_URL = `${API_URL}/pacijent`;


// const proxyurl = "https://cors-anywhere.herokuapp.com/"; //radi vraca 404

//3. Glavni deo: napravi klasu koja ima sve funkciju za pozivanje get/set/put/delet metode kojoj se prosledjuje 
//gore definisana putanja
class PacijentDataService{

    //Za kliniku test:
    verifyPacijenta(kod) {
        return axios.post(`${PACIJENT_API_URL}/verify`, kod);
    }

    getPacijentProfile() {
        return axios.get(`${API_URL}/userProfile`);
    }

    updatePacijentProfile(updatedPacijent){
        return axios.put(`${API_URL}/updatePacijent`,updatedPacijent);
    }

    loginPacijent(authenticationRequest){
        return axios.post(`${API_URL}/auth/login`, authenticationRequest);
    }

    registratingPacijent(pacijentData){
        return axios.post(`${API_URL}/pacijentLogin`, pacijentData);
    }
    
    //morace se modifikovati na beku da vrate samo one operacije i pregleda koji se odnose na tog jednog pacijenta.
    getAllPregled(){
        return axios.get(`${API_URL}/pregled`);
    }
    
    //modifikovana verzija koja vraca samo one pregleda koji su od tog pacijenta (i gotovi su).
    getAllFinishedPregled(){
        //"pacijent/zdravstveniKarton/pregled"
        return axios.get(`${PACIJENT_API_URL}/zdravstveniKarton/pregled`);
    }

    //Za prikaz detalja pregleda u zdravstvenom kartonu pacijenta:
    getPregled(id){
        return axios.get(`${API_URL}/pregled/${id}`);
    }
    //Za tabelu istorja operacija:
    getAllOperacija(){
        return axios.get(`${API_URL}/operacija`);
    }

    //Za prikaz buducih pregleda /patient/zakazaniPregledi:
    getPacijentZakazaniPregledi(){
        return axios.get(`${API_URL}/getZakazaniPregledi`);
    }

    //Za zakazivanje buducih pregleda /patient/zakazaniPregledi:
    zakaziPregled(pregled){
        return axios.put(`${API_URL}/zakaziPregled`, pregled);
    }

    otkaziPregled(pregled){
        return axios.put(`${API_URL}/otkaziPregled`, pregled);
    }

    
    getOverview(termin_id){
        return axios.get(`${API_URL}/getOverview/${termin_id}`/*,{
            params:termin_id
      }*/);
  }

// getOverview(termin_id){
//     return axios.get(`${API_URL}/overview`,{
//         params:termin_id
//   });
// }

    potvrdiPregled(termin_id){
        return axios.post(`${API_URL}/customPregled/${termin_id}`);
    }

}
export default new PacijentDataService();