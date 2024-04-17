import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../services/http.service";
import { api } from '../../environments/environment';
import storeSlice from "./store.slice";
const initialState={
    isLoading:false,
    roles:[]
}
export  const onViewRole = createAsyncThunk("view/roles", async () =>{
    const { data } = await http.get(`${api.java_url}/role`)
    return data
})
export const roleSlice = createSlice({
    name:"role",
    initialState,
    reducers :{},
    extraReducers(builder) {
        builder.addCase(onViewRole.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(onViewRole.fulfilled,(state,action)=>{
            state.isLoading=false
            state.roles= action.payload
        })
        .addCase(onViewRole.rejected,(state)=>{
            state.isLoading=false
        })
    }

})
export default roleSlice.reducer