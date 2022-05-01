import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export type Post = {
  id: string
  title: string
  content: string
  user: string
}

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0' },
  { id: '2', title: 'Second Post', content: 'More text', user: '1' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, { payload }: PayloadAction<Post>) => {
        state.push(payload)
      },
      prepare: (title: string, content: string, user: string) => ({
        payload: { id: nanoid(), title, content, user },
      }),
    },
    postUpdated: (
      state,
      { payload: { id, title, content } }: PayloadAction<Omit<Post, 'user'>>
    ) => {
      const post = state.find(post => post.id === id)
      if (!post) return
      post.title = title
      post.content = content
    },
  },
})

export default postsSlice.reducer
export const selectPost = (id?: string) => (state: RootState) =>
  state.posts.find(post => post.id === id)
export const { postAdded, postUpdated } = postsSlice.actions
