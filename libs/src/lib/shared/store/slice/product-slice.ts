import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../services/http.service";
import { api } from '../../environments/environment';
import { throwError } from "rxjs";
import {Toast} from "../../functions/toast";
import { useAuthSelector } from "../hooks/auth-hooks";
export interface Product{
    isLoading:boolean,
    product:any,
}
const initialState:Product={
    isLoading:false,
    product:[]
} 
export const onViewProduct = createAsyncThunk('view/product',async() =>{
    const response = await http.get(`${api.java_url}/product`)
    return response.data
})
export const findProductByCode = createAsyncThunk('viewById/product', async (code:string) =>{
    const response = await http.get(`${api.java_url}/product/${code}`)
    return response.data
})
export const onDeleteProduct = createAsyncThunk('delete/product',async (data:any) =>{
    const response = await http.delete(`${api.java_url}/product/${data.id}`)
    return response.data
})
export const addProduct = createAsyncThunk('add/product', async(payload:any) => {
    const response = await http.post(`${api.java_url}/product`,payload)
    return response.data
})
const productSlice = createSlice({
    name:'product-slice',
    initialState:initialState,
    reducers:{

        updateProductState(state,action){
            //console.log("this is my state",JSON.parse(JSON.stringify(state)),action)
            const payload =action.payload
            const index = state.product.findIndex((element:any) => element.id === payload.productId)
            const currentProduct = state.product[index]
            const {quantity, ...currentProductOnStringfy} = JSON.parse(JSON.stringify(currentProduct))
           const newQuantity = parseInt(quantity) + parseInt(payload.quantity)
           const newUpdatedProduct = {...currentProductOnStringfy,quantity:newQuantity.toString()}
           state.product.splice(index,1)
           state.product.splice(index,0,newUpdatedProduct)
           
        }

    },
    extraReducers (builder) {
        builder.addCase(onViewProduct.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(onViewProduct.fulfilled,(state,action) => {
            state.isLoading = false;
            state.product = action.payload
        })
        .addCase(onViewProduct.rejected,(state) => {
            state.isLoading=false
        })
        .addCase(onDeleteProduct.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(onDeleteProduct.fulfilled,(state,action) =>{
           const myIndex = state.product.findIndex((res:any) =>res.id === action.payload.id )
           state.product.splice(myIndex,1)
            state.isLoading=false
            const { message,payload } = action.payload
            Toast(message)
        })
        .addCase(addProduct.pending,(state) =>{
            state.isLoading = true
        })
        .addCase(addProduct.fulfilled,(state,action:any) =>{
            const { message,payload } = action.payload
            state.product.push(payload)
            Toast(message)
            state.isLoading = false
        })
        .addCase(addProduct.rejected,state =>{
            state.isLoading = false
        })
        .addCase(findProductByCode.pending, state =>{
            state.isLoading = true
        })
        .addCase(findProductByCode.fulfilled,(state,action) =>{
            state.product.push( action.payload)
            state.isLoading = false
            
        })
        .addCase(findProductByCode.rejected,state =>{
            state.isLoading = false
        })
    }

})
export const {updateProductState} = productSlice.actions
export default productSlice.reducer