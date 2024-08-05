import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../services/http.service";
import { api } from '../../environments/environment';
import { Toast } from "../../functions/toast";
interface SampleModel {
    isLoading: boolean,
    sample: any,
}
const initialState: SampleModel = {
    isLoading: false,
    sample: []
}

export const viewSample = createAsyncThunk("view/sample", async (id: number) => {
    const response = await http.get(`${api.java_url}/sample/${id}`)
    return response.data
})
export const addSample = createAsyncThunk("add/sample", async(data:any) =>{
    const response = await http.post(`${api.java_url}/sample`,data)
    return response.data
})
const sampleSlice = createSlice({
    name: 'sample',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(viewSample.pending, state => {
            state.isLoading = true
        })
            .addCase(viewSample.fulfilled, (state, action) => {
                const sample = action.payload
                if(sample.length >0){
                    sample.forEach((element:any) => {
                        state.sample.push(element)
                    });
                //state.sample=action.payload
                }
                state.isLoading = false
            })
            .addCase(viewSample.rejected,state =>{
                state.isLoading = false
            })
            .addCase(addSample.pending,state => {
                state.isLoading = true
            })
            .addCase(addSample.fulfilled,(state,action) =>{
                const {message,payload} =action.payload
                state.sample.push(payload);
                state.isLoading = false
                Toast(message)
            })
            .addCase(addSample.rejected,state =>{
                state.isLoading = false
            })
    }
})
export default sampleSlice.reducer