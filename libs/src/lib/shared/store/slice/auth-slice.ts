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
    const response = await http.post(`${api.url}/auth/login`,data)
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
                state.access_token= action.payload.access_token
                Cookies.set('access_token',action.payload.access_token)
            
                
        })
        .addCase(loginThunk.rejected,(state) =>{
            state.isLoading=false
            state.access_token=''
        })
    }
})

export const {onLogin,onLogout} = loginSlice.actions  //export action from slice
export default loginSlice.reducer