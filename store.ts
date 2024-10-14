import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./slices/loginSlice"

export const store = configureStore({
    reducer: {

        roleid: loginReducer
    },
})


// Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch