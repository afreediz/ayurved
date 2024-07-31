import axios from "axios";

console.log("process.env.REACT_APP_API_URL",process.env.REACT_APP_API_URL);
const API = axios.create({baseURL:process.env.REACT_APP_API_URL})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('token')){
        req.headers.Authorization = localStorage.getItem('token')
    }
    return req
})

export default API;

export const format_date = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    return `${day}/${month}/${year}`
}