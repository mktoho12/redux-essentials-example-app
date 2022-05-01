import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
export const selectUser = (id: string) => (state: RootState) =>
  state.users.find(user => user.id === id)
