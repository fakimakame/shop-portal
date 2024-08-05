import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../services/http.service";
import { api } from '../../environments/environment';
import { Toast } from "../../functions/toast";
export interface CategoryModel {
    isLoading: boolean,
    category: any
}
const initialState: CategoryModel = {
    isLoading: false,
    category: [],
}
export const addCategory = createAsyncThunk('add/addCategory', async (data:{name:string}) => {
    const response = await http.post(`${api.java_url}/category`, data)
    return response.data
})
export const viewCategory = createAsyncThunk("view/viewCategory", async () => {
    const response = await http.get(`${api.java_url}/category`)
    return response.data
})
// export const viewSizeByCategoryId = createAsyncThunk("view/viewSizeByCid", async () =>{
//     const response = 
// })
export const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addCategory.pending, state => {
            state.isLoading = true
        })
            .addCase(addCategory.fulfilled, (state, action) => {
                const { message, payload } = action.payload
                state.category.push(payload)
                Toast(message, "success")
                state.isLoading = false
            })
            .addCase(addCategory.rejected, state => {
                state.isLoading = false
            })
            .addCase(viewCategory.pending, state => {
                state.isLoading = true
            })
            .addCase(viewCategory.fulfilled, (state, action) => {
                state.category = action.payload
              //  Toast(message, "success")
                state.isLoading = false
            })
            .addCase(viewCategory.rejected, state => {
                state.isLoading = false
            })

    }
})
export default categorySlice.reducer