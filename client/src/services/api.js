import axios from "axios";

const API = axios.create({baseURL:"/api/"})
// const API = axios.create({baseURL:"http://localhost:3002/api/"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('token')){
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return req
})

export default API;

export const format_date = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()

    return `${day}/${month}/${year}`
}
