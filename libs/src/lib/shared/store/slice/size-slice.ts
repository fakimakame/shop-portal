import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../services/http.service";
import { api } from '../../environments/environment';
import { Toast } from "../../functions/toast";
export interface SizeModel {
    isLoading: boolean,
    size: any
}
const initialState: SizeModel = {
    isLoading: false,
    size: [],
}
export const addSize = createAsyncThunk('add/addSize', async (size: any) => {
    const response = await http.post(`${api.java_url}/size`, size)
    return response.data
})
export const viewSize = createAsyncThunk("view/viewSize", async () => {
    const response = await http.get(`${api.java_url}/size`)
    return response.data
})
export const productSizeSlice = createSlice({
    name:"product size",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(addSize.pending, state => {
            state.isLoading = true
        })
            .addCase(addSize.fulfilled, (state, action) => {
                const { message, payload } = action.payload
                state.size.push(payload)
                Toast(message, "success")
                state.isLoading = false
            })
            .addCase(addSize.rejected, state => {
                state.isLoading = false
            })
            .addCase(viewSize.pending, state => {
                state.isLoading = true
            })
            .addCase(viewSize.fulfilled, (state, action) => {
                state.size = action.payload
                state.isLoading = false
            })
            .addCase(viewSize.rejected, state => {
                state.isLoading = false
            })
    },

})

export default productSizeSlice.reducer