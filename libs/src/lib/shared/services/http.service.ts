
import axios from "axios";
import { toast } from "react-toastify";
import { authToken, clearToken, isTokenExpired } from "../functions/auth";
//export function useLogin(){
// const token = useAuthSelector((state) => state.login.access_token)//authToken()
const token = authToken()

// axios.interceptors.response.use(null, errors =>{
//     const status= errors.response.data
//     if(status){
//         const { data }=errors.response
//            toast.error(data.message)
//     }
//     else{
//         toast.success('success')
//     }
// })
//Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        // If token is available, add it to the headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        const status= error.response.data
        if(status){
        const { data }=error.response
            toast.error(data.message)
        return Promise.reject(error);
        }
    }
);

// },[])
export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put
}