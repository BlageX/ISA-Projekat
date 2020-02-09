// 1. Import axios
import axios from "axios";
// 2. Definisati 2 url
const API_URL = "http://localhost:8080";
const RADNIK_API_URL = `${API_URL}/radniks/`;

//3. Glavni deo: napravi klasu koja ima sve funkciju za pozivanje get/set/put/delet metode kojoj se prosledjuje 
//gore definisana putanja
class RadnikDataService {

    getAllRadniks() {
      return axios.get(`${RADNIK_API_URL}`);
    }

    getRadnik(id){
      return axios.get(`${RADNIK_API_URL}/${id}`);
    }

    updateRadnik(id,radnik){
      return axios.put(`${RADNIK_API_URL}/${id}`,radnik);
    }

    addRadnik(radnik){
        return axios.post(`${RADNIK_API_URL}`,radnik);
    }

    deleteRadnik(id){
        return axios.delete(`${RADNIK_API_URL}/${id}`);
    }
}
export default new RadnikDataService();