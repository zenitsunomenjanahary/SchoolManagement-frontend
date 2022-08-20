import axios from "axios"

const Teacher_Api_Url = "http://localhost:5000/teachers";

class TeacherService {

    async getTeachers(){
        const response = await  axios.get(Teacher_Api_Url);
        const data = await response.data;
        return data;
    }

    async createTeacher(teacher){
        return axios.post(Teacher_Api_Url, teacher, {headers:{'Content-Type':"application/json"}});
    }

    async getTeacherById(id){
        const response = await axios.get(`${Teacher_Api_Url}/${id}`);
        const data = await response.data;
        return data;
    }

    updateTeacher(id, teacher){
        return axios.put(`${Teacher_Api_Url}/${id}`, teacher,{headers:{'Content-Type':"application/json",'Access-Control-Allow-Origin': '*'}});
    }

    async deleteTeacher(id){
        return await axios.delete(`${Teacher_Api_Url}/${id}`);
    }
}

export default new TeacherService()