import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import postsSlice from '../features/posts/postsSlice'
import usersSlice from '../features/users/usersSlice'

const store = configureStore({
  reducer: {
    counter: counterSlice,
    posts: postsSlice,
    users: usersSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
