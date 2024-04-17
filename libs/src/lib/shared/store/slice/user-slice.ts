import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import http from "../../services/http.service"
import { api } from '../../environments/environment';
import {Toast} from "../../functions/toast";
const initialState={
   user: [{}],
   isLoading:false
}
export const viewUser = createAsyncThunk('view/users', async() => {
    const response = await http.get(`${api.java_url}/auth/users`)
    return response.data
})
export const createUser = createAsyncThunk('create/user', async(payload:any) => {
    const response = await http.post(`${api.java_url}/auth/signup`,payload)
    return response.data
})
export const deleteUser = createAsyncThunk('delete/user', async(id:number) => {
    const response = await http.delete(`${api.java_url}/auth/delete/${id}`)
    return response.data
})
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(viewUser.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(viewUser.fulfilled,(state,action) => {
            state.isLoading=false;
            state.user=action.payload;
        })
        .addCase(viewUser.rejected,(state) => {
            state.isLoading=false
        })
        .addCase(createUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createUser.fulfilled, (state,action) =>{
            state.isLoading=false
            const {message,...payload} = action.payload.payload
            state.user.push(payload)
        })
        .addCase(createUser.rejected,(state)=>{
            state.isLoading=false
        })
        .addCase(deleteUser.pending,(state )=>{
            state.isLoading = true
        })
        .addCase(deleteUser.fulfilled,(state,action) =>{
            const index =state.user.findIndex((element:any) => element.id === action.payload.id)
            state.user.splice(index,1)
            Toast(action.payload.message)
            state.isLoading = false
        })
        .addCase(deleteUser.rejected,(state) => {
            state.isLoading = false
        })
    }
}) 

export default userSlice.reducer;