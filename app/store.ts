import { configureStore } from "@reduxjs/toolkit"
import counterSlice from "../features/counter/counterSlice"

const store = configureStore({
  reducer: {
    counter: counterSlice,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
