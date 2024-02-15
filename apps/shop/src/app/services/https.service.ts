
import { authToken } from "@shop-portal/libs";
import axios from "axios";
import { toast } from "react-toastify";
const token =authToken()
// if(token !== null || token !== undefined){
//  axios.defaults.headers.common['Authorization']=`Bearer ${token}`
// }

// axios.interceptors.response.use(null, errors =>{
//     if(errors){
//         const { data }=errors.response
//         if(data.statusCode ===  402 )
//         {
//         toast.error(data.message)
//         }
//     }
//     else{
//         toast.success('success')
//     }
// })
// export default {
//     get:axios.get,
//     post:axios.post,
//     delete:axios.delete,
//     put:axios.put
// }