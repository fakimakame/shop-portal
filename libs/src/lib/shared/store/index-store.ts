import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slice/auth-slice'
import stationReducer from './slice/station-slice'
import productReducer from './slice/product-slice'
import userReducer from './slice/user-slice'
import roleReducer from './slice/role-slice'
import storeReducer from './slice/store.slice'
import purchaseReducer from './slice/purchase-slice'
import shiftReducer from './slice/shift.slice'
import sampleReducer from './slice/sample-slice'
import categoryReducer from './slice/category-slice'
import sizeReducer from './slice/size-slice'
import categorySizeReducer from './slice/category-size-slice'
export const store = configureStore({
    reducer:{
        login:loginReducer,
        station:stationReducer,
        product:productReducer,
        user:userReducer,
        role:roleReducer,
        store:storeReducer,
        purchase:purchaseReducer,
        shift:shiftReducer,
        sample:sampleReducer,
        category:categoryReducer,
        size:sizeReducer,
        categorySize:categorySizeReducer,
    }
})

export type AuthDispatch = typeof store.dispatch
export type AuthState = ReturnType< typeof store.getState>