import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, FirestoreDataConverter, getDocs } from 'firebase/firestore'
import { RootState } from '../../app/store'
import { db } from '../../lib/firebase'

export type User = {
  id: string
  name: string
}

type UsersState = {
  data: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: UsersState = {
  data: [],
  status: 'idle',
  error: undefined,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User) => user,
  fromFirestore: snapshot => {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      name: data.name,
    }
  },
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const snapshot = await getDocs(
    collection(db, 'users').withConverter(userConverter)
  )
  return snapshot.docs.map(doc => doc.data())
})

export default usersSlice.reducer

export const selectAllUsers = ({ users: { data: users } }: RootState) => users
export const selectUserById = (
  { users: { data: users } }: RootState,
  userId: string
) => users.find(user => user.id === userId)
