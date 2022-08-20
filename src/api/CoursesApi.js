import axios from "axios"

const Course_Api_Url = "http://localhost:5000/courses";

class CourseService {

    async getCourses(){
        const response = await  axios.get(Course_Api_Url);
        const data = await response.data;
        return data;
    }

    async createCourse(course){
        return axios.post(Course_Api_Url, course, {headers:{'Content-Type':"application/json"}});
    }

    async getCourseById(id){
        const response = await axios.get(`${Course_Api_Url}/${id}`);
        const data = await response.data;
        return data;
    }

    updateCourse(id, course){
        return axios.put(`${Course_Api_Url}/${id}`, course,{headers:{'Content-Type':"application/json",'Access-Control-Allow-Origin': '*'}});
    }

    async deleteCourse(id){
        return await axios.delete(`${Course_Api_Url}/${id}`);
    }
}

export default new CourseService()