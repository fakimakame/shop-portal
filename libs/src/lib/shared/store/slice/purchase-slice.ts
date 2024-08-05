import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../services/http.service";
import { api } from '../../environments/environment';
import { Toast } from "../../functions/toast";
export interface Purchase{
    isLoading:boolean,
    purchase:any,
}
const initialState:Purchase = {
    isLoading:false,
    purchase:[]
}
export const addPurchase = createAsyncThunk("add/purchase", async(payload:any)=>{
    const response = await http.post(`${api.java_url}/purchase`,payload)
    return response.data
})
export const viewPurchase = createAsyncThunk("view/purchase",async() =>{
    const response = await http.get(`${api.java_url}/purchase`)
    return response.data
})
export const purchaseSlice = createSlice({
    name:"purchase",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(addPurchase.pending,state =>{
            state.isLoading=true
        })
        .addCase(addPurchase.fulfilled,(state,action) =>{
            state.isLoading= false
            const {message,payload ,...rest} = action.payload
            state.purchase.push(payload)
            Toast(message,"success")
        })
        .addCase(addPurchase.rejected,state =>{
            state.isLoading = false
        })
        .addCase(viewPurchase.pending,state =>{
            state.isLoading = true
        })
        .addCase(viewPurchase.fulfilled,(state,action) =>{
            state.isLoading = false
            state.purchase = action.payload
        })
        .addCase(viewPurchase.rejected,state =>{
            state.isLoading = false
        })
    }

})

export default purchaseSlice.reducer