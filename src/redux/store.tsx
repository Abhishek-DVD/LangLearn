import {configureStore} from '@reduxjs/toolkit'
import rootReducer from "./slices";

const store = configureStore({
    reducer : {
        root:rootReducer,
    }
})

export default store;