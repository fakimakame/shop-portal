/* eslint-disable @typescript-eslint/no-unused-expressions */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../../services/http.service'
import { api } from '../../environments/environment';
import Cookies from "js-cookie";
import { clearToken } from "../../functions/auth";

interface Token{
    access_token:string
}
const initialState={
    access_token:'',
    isLoading:false
}

export const loginThunk = createAsyncThunk('user/login', async (data:{username :string , password : string}) => {
    const response = await http.post(`${api.java_url}/auth/login`,data)
    return response.data
})

const loginSlice= createSlice({
    name:'login',
    initialState,
    reducers:{
        onLogin(state,action:PayloadAction<string>){
            state.access_token=action.payload
        },
        onLogout(state){
            state.access_token=''
            clearToken()
        }
    },
    extraReducers: builder =>{
        builder.addCase(loginThunk.pending,(state) => {
            state.isLoading =true
        })
        .addCase(loginThunk.fulfilled,(state,action) => {
                state.isLoading=false
                const{token, ...rest} =action.payload
                state.access_token = token
                Cookies.set('access_token',token)
                const userInfo = {
                    id:rest.id,
                    username:rest.username,
                    fullname:rest.fullname,
                    roles:rest.roles
                }
                const userObj =JSON.stringify(userInfo)
                sessionStorage.setItem('userInfo',userObj)
        })
        .addCase(loginThunk.rejected,(state) =>{
            state.isLoading=false
            state.access_token=''
        })
    }
})

export const {onLogin,onLogout} = loginSlice.actions  //export action from slice
export default loginSlice.reducer