// 1. Import axios
import axios from "axios";

// 2. Definisati 2 url
const API_URL = "http://localhost:8080";
const DOKTOR_API_URL = `${API_URL}/doktor`;

//3. Glavni deo: napravi klasu koja ima sve funkciju za pozivanje get/set/put/delet metode kojoj se prosledjuje 
//gore definisana putanja
class DoktorDataService {
    //Za kliniku test:
    getAllDoktor() {
        return axios.get(`${DOKTOR_API_URL}`);
    }

    getDoktor(id){
        return axios.get(`${DOKTOR_API_URL}/${id}`);
    }

    //Iz klinike kada posle search udjem u listu lekara preuzimam paramtre iz url i smestam ih kao parametre filtracije na beku.
    //Ovaj url gadljam i kada radim search u listi klinika i  kada radim search u listi doktora
    getDoktorByKlinikaSerach(params){
        return axios.get(`${API_URL}/getDoktorByParams`,{
            params:params
        });
    }

    //iz liste doktora za profila klinike  
    //Ovaj url gadljam i kada radim search u listi klinika i  kada radim search u listi doktora
    // getDoktorByDoktorSerach(searchedDoktor){
    //     return axios.get(`${API_URL}/getDoktorByParams`,{
    //         params:searchedDoktor
    //     });
    // }
    
}
export default new DoktorDataService();