import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../../services/http.service'
import { api } from '../../environments/environment';
import {Toast} from "../../functions/toast";
export interface stationModel{
    isLoading:boolean,
    status?:string,
    station:any,
}
export const initialState:stationModel={
    isLoading:false,
    status:'idle',
    station:[]
}
export const viewStation = createAsyncThunk('view/station',async () =>{
    const response= await http.get(`${api.java_url}/station`)
    return response.data
})
export const saveStation = createAsyncThunk('save/station',async (data:{stationName:string}) =>{
    const response = await http.post(`${api.java_url}/station`,data)
    return response.data
})
export const deleteStation = createAsyncThunk('delete/station', async(data:{id:number,stationName:string}) =>{
    const response = await http.delete(`${api.java_url}/station/${data.id}`)
    return response.data
})
const stationSlice = createSlice({
    name:'station-slice',
    initialState,
    reducers:{
         onView(state:stationModel){
            const response=  http.get(`${api.url}/station`)
            state.status ='successiful'
        }
    },
    extraReducers(builder) {
        builder.addCase(viewStation.pending,(state,action:any)=>{
            state.isLoading = true
        })
        .addCase(viewStation.fulfilled,(state,action:any) =>{
            state.isLoading=false
            state.station = action.payload
        })
        .addCase(saveStation.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(saveStation.fulfilled,(state,action:any) => {
            state.isLoading=false
            const { message, ...rest } = action.payload
            state.station.push(rest)
            Toast(message)
        })
        .addCase(saveStation.rejected,(state) =>{
            state.isLoading=false
        })
        .addCase(deleteStation.pending,(state,action) => {
            state.isLoading=true
        })
        .addCase(deleteStation.fulfilled,(state,action) => {
            state.isLoading=false
            const {message,id} = action.payload
            //const newState = state.station.filter((data:any) => data.id !== id)
            const index = state.station.findIndex((data:any) => data.id === id);
            state.station.splice(index,1)
            Toast(message)
        })
        .addCase(deleteStation.rejected,(state,action) =>{
            state.isLoading=false
        })
    },
})

export const{ onView } =  stationSlice.actions
export default stationSlice.reducer