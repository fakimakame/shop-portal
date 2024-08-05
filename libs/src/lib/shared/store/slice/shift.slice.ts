import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../services/http.service";
import { api } from '../../environments/environment';
import { Toast } from "../../functions/toast";
interface ShiftModel{
isLoading:boolean,
shift:any,
}
const initialState: ShiftModel= {
    isLoading:false,
    shift:[]
}
export const addShift = createAsyncThunk('add/shift',async(payload:any) =>{
    const response = await http.post(`${api.java_url}/shift`,payload)
    return response.data
})
export const viewShiftToAdmin = createAsyncThunk('view/openshift', async(status:string) =>{
    const response = await http.get(`${api.java_url}/shift/${status}`)
    return response.data
})
export const viewShiftToUser = createAsyncThunk('view/openusershift', async(payload:{userId:number,status:string}) =>{
    const response = await http.get(`${api.java_url}/shift/${payload.userId}/${payload.status}`)
    return response.data
})
const shiftSlice = createSlice({
    name:'shiftslice',
    initialState:initialState,
    reducers:{},
    extraReducers(build){
        build.addCase(addShift.pending,state =>{
            state.isLoading = true
        })
        .addCase(addShift.fulfilled, (state,action) => {
            const {message,type,payload} = action.payload
            state.shift.push(payload)
            Toast(message,type)
            state.isLoading= false
        })
        .addCase(addShift.rejected,state => {
            state.isLoading = false
        })
        .addCase(viewShiftToAdmin.pending,state =>{
            state.isLoading = true
        })
        .addCase(viewShiftToAdmin.fulfilled,(state,action) =>{
            state.shift = action.payload
            state.isLoading = false
        })
        .addCase(viewShiftToAdmin.rejected,state =>{
            state.isLoading = false
        })
        .addCase(viewShiftToUser.pending,state=>{
            state.isLoading = true
        })
        .addCase(viewShiftToUser.fulfilled,(state,action)=>{
            state.shift = action.payload
            state.isLoading = false
        })
        .addCase(viewShiftToUser.rejected,state =>{
            state.isLoading = false
        })
    }
})

export default shiftSlice.reducer