import axios from "axios"

const STUDENT_API_BASE_URL = "http://localhost:5000/students";

class StudentService {

    async getStudents(){
        const response = await  axios.get(STUDENT_API_BASE_URL);
        const data = await response.data;
        return data;
    }

    async createStudent(student){
        return axios.post(STUDENT_API_BASE_URL, student, {headers:{'Content-Type':"application/json"}});
    }

    async getStudentById(id){
        const response = await axios.get(STUDENT_API_BASE_URL + '/' + id);
        const data = await response.data;
        return data;
    }

    updateStudent(id, student){
        return axios.put(`${STUDENT_API_BASE_URL}/${id}`, student,{headers:{'Content-Type':"application/json",'Access-Control-Allow-Origin': '*'}});
    }

    async deleteStudent(id){
        return await axios.delete(STUDENT_API_BASE_URL + '/' + id);
    }
}

export default new StudentService()