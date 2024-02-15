import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slice/auth-slice'
import stationReducer from './slice/station-slice'

export const store = configureStore({
    reducer:{
        login:loginReducer,
        station:stationReducer,
    }
})

export type AuthDispatch = typeof store.dispatch
export type AuthState = ReturnType< typeof store.getState>