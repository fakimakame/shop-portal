
// eslint-disable-next-line @nx/enforce-module-boundaries
import  http from '../../../../../libs/src/lib/shared/services/http.service'
import { api } from '@shop-portal/libs'
import {  useNavigate } from 'react-router-dom';
export default class LoginService {
    //url ='http://localhost:3100/'
    //private url = '/shop-api/';
   async getById(data:any){
        //return await http.post(`/shop-api/auth/login`,data)
        return await http.post(`${api.url}/auth/login`,data)
    }
     async getByIds(data:any){
        return await fetch(`/api/auth/login`,{
            method :'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
     }
    
     logout = () =>{
        const navigate = useNavigate()
        localStorage.removeItem('token')
        navigate('/shop')
     }
     async getUserData(){
        //return await http.get(`${api.url}/auth/data`)
        console.log('this is my function')
     }

}