import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import http from '../../services/http.service'
import { api } from '../../environments/environment';
import { useState } from "react";
import {Toast} from "../../functions/toast";
export interface Store{
    isLoading:boolean,
    store:any,
}

const initialState: Store ={
    isLoading:false,
    store:[]
}

export const viewStore = createAsyncThunk('view/store', async(id:number) =>{
    const response = await http.get(`${api.java_url}/store?stationId=${id}`)
    return response.data
})
export const addToStore = createAsyncThunk('add/store', async(payload:any) => {
    const response = await http.post(`${api.java_url}/store`,payload)
    return response.data
})

const storeSlice = createSlice({
    name:"store",
    initialState,
    reducers:{
        clearStoreState(state){
            return initialState
        }
    },
    extraReducers(build){
        build.addCase(viewStore.pending,(state) =>{
            state.isLoading=true
        })
        .addCase(viewStore.fulfilled,(state,action)=>{
            state.isLoading = false
            state.store = action.payload
        })
        .addCase(viewStore.rejected,state => {
            state.isLoading = false
        })
        .addCase(addToStore.pending,state =>{
            state.isLoading = true
        })
        .addCase(addToStore.fulfilled, (state,action)=>{
            const { message,payload,type } = action.payload
            state.store.push(payload)
            Toast(message,type)
            state.isLoading = false
        })
        .addCase(addToStore.rejected, state =>{
            state.isLoading = false
        })
    }
})
export const { clearStoreState } = storeSlice.actions
export default storeSlice.reducer