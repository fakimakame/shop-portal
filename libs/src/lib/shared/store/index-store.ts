import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slice/auth-slice'
import stationReducer from './slice/station-slice'
import productReducer from './slice/product-slice'
import userReducer from './slice/user-slice'
import roleReducer from './slice/role-slice'
import storeReducer from './slice/store.slice'

export const store = configureStore({
    reducer:{
        login:loginReducer,
        station:stationReducer,
        product:productReducer,
        user:userReducer,
        role:roleReducer,
        store:storeReducer
    }
})

export type AuthDispatch = typeof store.dispatch
export type AuthState = ReturnType< typeof store.getState>