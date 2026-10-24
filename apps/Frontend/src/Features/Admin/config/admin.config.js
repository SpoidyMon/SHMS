import axios from "axios"

export const apiAdmin=axios.create({
    baseURL:'http://localhost:8080/api/admin',
    withCredentials:true
})