import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../../services/http.service'
import { api } from '../../environments/environment';
export interface stationModel{
    isLoading:boolean,
    station:any,
}
export const initialState:stationModel={
    isLoading:false,
    station:[]
}

export const viewStation = createAsyncThunk('view/station',async () =>{
    const response= await http.get(`${api.url}/station`)
    return response.data
})
export const saveStation = createAsyncThunk('save/station',async (data:{stationName:string}) =>{
    const response = await http.post(`${api.url}/station`,data)
    return response.data
})
const stationSlice = createSlice({
    name:'station-slice',
    initialState,
    reducers:{
        onView(state:stationModel,action:PayloadAction<stationModel>){
             state.station=action.payload.station;
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
        })
        .addCase(saveStation.rejected,(state) =>{
            state.isLoading=false
        })
    },
})

export const{ onView } =  stationSlice.actions
export default stationSlice.reducer