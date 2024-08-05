import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import http from '../../services/http.service'
import { api } from '../../environments/environment';
import { useState } from "react";
import {Toast} from "../../functions/toast";
import { TypedUseSelectorHook } from 'react-redux';
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
export const addStoreToStation = createAsyncThunk("put/store", async(payload:any) =>{
    const response =await http.post(`${api.java_url}/store/addToStation`,payload)
    return response.data
})
export const getAvailableQuantity = createAsyncThunk('view/storeById', async(id:number) =>{
    const response = await http.get(`${api.java_url}/store/${id}`)
    return response.data
})

export const updatePrice = createAsyncThunk('put/updatePrice', async(data:any)=>{
    const response = await http.put(`${api.java_url}/store`,data)
    return response.data
})

const storeSlice = createSlice({
    name:"store",
    initialState,
    reducers:{
        clearStoreState(state){
            return initialState
        },
        // async  onViewRemainQuantity(id:number){
        //     const response = await http.post(`${api.java_url}/store/${id}`)
        //     return response.data
        // }
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
        .addCase(getAvailableQuantity.pending,state =>{
            state.isLoading = true;
        })
        .addCase(getAvailableQuantity.fulfilled,state =>{
            state.isLoading = false
        })
        .addCase(getAvailableQuantity.rejected,state =>{
            state.isLoading = false
        })
        .addCase(addStoreToStation.pending,state=>{
            state.isLoading=true
        })
        .addCase(addStoreToStation.fulfilled,(state,action) =>{
            state.isLoading = false
            const {message,type,payload} = action.payload
            //const newStateAfterRemoveUpdatedRow=state.store.filter((element:any) => element.id !==payload.id)
            const index=state.store.findIndex((element:any) => element.id ===payload.id)
            state.store.splice(index,1)
           state.store.splice(index,0,payload) //this is for adding new value
            Toast(message,type);
        })
        .addCase(addStoreToStation.rejected,state=>{
            state.isLoading = false
        })
        .addCase(updatePrice.pending,state =>{
            state.isLoading = true
        })
        .addCase(updatePrice.fulfilled,(state,action)=>{
            state.isLoading = false
            console.log("this is my payload",action.payload)
            const {message,type,payload} = action.payload
            const index = state.store.findIndex((element:any) => element.id === payload.id)
            state.store.splice(index,1)
            state.store.splice(index,0,payload)
            state.isLoading = false
            Toast(message,type)
        })
        .addCase(updatePrice.rejected,state =>{
            state.isLoading = false
        })
    }
})
export const { clearStoreState } = storeSlice.actions
export default storeSlice.reducer