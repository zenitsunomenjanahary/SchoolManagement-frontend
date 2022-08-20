import axios from "axios"

const Classe_Api_Url = "http://localhost:5000/classes";

class ClasseService {

    async getClasses(){
        const response = await  axios.get(Classe_Api_Url);
        const data = await response.data;
        return data;
    }

    async createClasse(classe){
        return axios.post(Classe_Api_Url, classe, {headers:{'Content-Type':"application/json"}});
    }

    async getClasseById(id){
        const response = await axios.get(`${Classe_Api_Url}/${id}`);
        const data = await response.data;
        return data;
    }

    updateClasse(id, classe){
        return axios.put(`${Classe_Api_Url}/${id}`, classe,{headers:{'Content-Type':"application/json",'Access-Control-Allow-Origin': '*'}});
    }

    async deleteClasse(id){
        return await axios.delete(`${Classe_Api_Url}/${id}`);
    }
}

export default new ClasseService()