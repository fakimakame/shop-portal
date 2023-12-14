import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, errors =>{
    console.log('it work',errors)
    if(errors){
        const { data }=errors.response
        if(data.statusCode ===  402 )
        {
        toast.error(data.message)
        }
    }
    else{
        toast.success('success')
    }
})
export default {
    get:axios.get,
    post:axios.post,
    delete:axios.delete,
    put:axios.put
}