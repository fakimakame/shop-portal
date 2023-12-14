
import  http from './http.service'

export default class LoginService {
    url = 'http://localhost:3100/'
   async getById(data:any){
        return await http.post(`${this.url}auth/login`,data)
    }
}