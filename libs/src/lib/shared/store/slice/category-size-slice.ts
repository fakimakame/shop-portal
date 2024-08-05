import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import http from "../../services/http.service";
import { api } from '../../environments/environment';
import { Toast } from "../../functions/toast";
export interface CategorySizeModel {
    isLoading: boolean,
    categorySize: any
}
const initialState: CategorySizeModel = {
    isLoading: false,
    categorySize: [],
}
export const viewCategoryWithSize = createAsyncThunk("view/categoryWithSize", async () => {
    const response = await http.get(`${api.java_url}/categorysize`)
    return response.data
})
export const addSizeToCategory = createAsyncThunk("add/categorysize", async(data:any) =>{
    const response = await http.post(`${api.java_url}/categorysize`,data)
    return response.data
})
export const categorySizeSlice = createSlice({
    name: "categorysize",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(viewCategoryWithSize.pending,state =>{
            state.isLoading = true
        })
        .addCase(viewCategoryWithSize.fulfilled,(state,action)=>{
            state.categorySize = action.payload
            state.isLoading = false
        })
        .addCase(viewCategoryWithSize.rejected,state =>{
            state.isLoading = false
        })
        .addCase(addSizeToCategory.pending,state =>{
            state.isLoading = true
        })
        .addCase(addSizeToCategory.fulfilled,(state,action) =>{
            const {message,payload} = action.payload
            state.categorySize.push(payload)
            state.isLoading = false
            Toast(message)
        })
        .addCase(addSizeToCategory.rejected,state =>{
            state.isLoading = false
        })
    },
})

export default categorySizeSlice.reducer