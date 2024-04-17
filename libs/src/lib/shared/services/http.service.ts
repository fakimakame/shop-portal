
import axios from "axios";
import { toast } from "react-toastify";
import { authToken, clearToken, isTokenExpired } from "../functions/auth";
//export function useLogin(){
   // const token = useAuthSelector((state) => state.login.access_token)//authToken()
   const token=authToken()
   // useEffect(()=>{
        // if(token){
        //     axios.defaults.headers.common['Authorization']=`Bearer ${token}`
        //    }
        //    axios.interceptors.request.use(
        //     config => {
        //      if(token){
        //         config.headers.Authorization = `Bearer ${token}`;
        //      }
        //      return config
        //     },
        //     error => {
        //         if(error){
        //             const { data }=error.response
        //             if(data.statusCode ===  402 )
        //             {
        //                toast.error(data.message)
        //             }
        //             }
        //             else{
        //                 toast.success('success')
        //             } 
        //     }
        //    )
        axios.interceptors.response.use(null, errors =>{
            const status= errors.response.data
            if(status){
                const { data }=errors.response
                   toast.error(data.message)
            }
            else{
                console.log("this is working block");
                toast.success('success')
            }
        })

   // },[])
export default {
    get:axios.get,
    post:axios.post,
    delete:axios.delete,
    put:axios.put
}