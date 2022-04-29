import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: state => { state.value++ }
  },
})

export const { increment } = counterSlice.actions
export const selectCount = (state: RootState) => state.counter.value
export default counterSlice.reducer
