// 1. Import axios
import axios from "axios";

// 2. Definisati 2 url
const API_URL = "http://localhost:8080";
const KLINIKA_API_URL = `${API_URL}/klinika`;

//3. Glavni deo: napravi klasu koja ima sve funkciju za pozivanje get/set/put/delet metode kojoj se prosledjuje 
//gore definisana putanja
class KlinikaDataService {
    //Za kliniku test:
    getAllKlinika() {
        return axios.get(`${KLINIKA_API_URL}`);
    }

    getKlinika(id){
        return axios.get(`${KLINIKA_API_URL}/${id}`);
    }

    getPreglediInKlinika(id){
        return axios.get(`${KLINIKA_API_URL}/${id}/predefPregledFromKlinika`);
    }

    
    getSearchedKlinika(searchedKlinika){
        return axios.get(`${KLINIKA_API_URL}/search`,{
            params:searchedKlinika
        });
    }

    getAllTipPregleda(){
        return axios.get(`${API_URL}/tipPregleda`)
    }

    getTipPregledaByKlinikaId(id){
        return axios.get(`${KLINIKA_API_URL}/${id}/tipPregledaByKlinika`)
    }

    getAllSaleByKlinikaId(id){
        return axios.get(`${KLINIKA_API_URL}/${id}/getSale`);
    }
   
    
}
export default new KlinikaDataService();