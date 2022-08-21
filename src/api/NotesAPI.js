import axios from "axios"

const Note_Api_Url = "http://localhost:5000/notes";

class NoteService {

    async getNotes(){
        const response = await  axios.get(Note_Api_Url);
        const data = await response.data;
        return data;
    }

    async createNote(note){
        return axios.post(Note_Api_Url, note, {headers:{'Content-Type':"application/json"}});
    }

    async getNoteById(id){
        const response = await axios.get(`${Note_Api_Url}/${id}`);
        const data = await response.data;
        return data;
    }

    updateNote(id, note){
        return axios.put(`${Note_Api_Url}/${id}`, note,{headers:{'Content-Type':"application/json",'Access-Control-Allow-Origin': '*'}});
    }

    async deleteNote(id){
        return await axios.delete(`${Note_Api_Url}/${id}`);
    }
}

export default new NoteService()