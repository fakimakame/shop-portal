import { redirect,useNavigate} from "react-router-dom"
import { useAuthDispatch, useAuthSelector } from "../store/hooks/auth-hooks"
import { useEffect } from "react"
import { of } from "rxjs"
import Cookies from 'js-cookie';

export function authToken(){
    return Cookies.get('access_token') !== null ? Cookies.get('access_token') : null
    
}

export function checkAuthLoader(){
    const token=authToken()

    if(!token){

        return redirect('/')
    }

    return null
}

export function useCheckAuthLoader(){
    const token = Cookies.get('access_token')//useAuthSelector((state) => state.login.access_token) 
    const navigate =useNavigate()

    useEffect(() => {
        if(!token){
             return navigate('/')
        }
    },[token,navigate])
   
}

export function clearToken(){
    Cookies.remove('access_token')
    sessionStorage.removeItem('userInfo')
    
 }

//this function for checking either token is expired
export function isTokenExpired(token: any) {
    const expiry =(JSON.parse(window.atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

export default {
    authToken,
    isTokenExpired
}