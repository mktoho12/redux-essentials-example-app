import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { sub } from 'date-fns'

export type Post = {
  id: string
  date: string
  title: string
  content: string
  user: string
  reactions: {
    [key: string]: number
  }
}

const initialState: Post[] = [
  {
    id: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    reactions: {},
  },
  {
    id: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    title: 'Second Post',
    content: 'More text',
    user: '1',
    reactions: {},
  },
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
        payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user,
          reactions: {},
        },
      }),
    },

    postUpdated: (
      state,
      {
        payload: { id, title, content },
      }: PayloadAction<Pick<Post, 'id' | 'title' | 'content'>>
    ) => {
      const post = state.find(post => post.id === id)
      if (!post) return
      post.title = title
      post.content = content
    },

    reactionAdded: (
      state,
      {
        payload: { postId, reaction },
      }: PayloadAction<{ postId: string; reaction: string }>
    ) => {
      const existingPost = state.find(post => post.id === postId)
      existingPost &&
        (existingPost.reactions[reaction] =
          (existingPost.reactions[reaction] || 0) + 1)
    },
  },
})

export default postsSlice.reducer
export const selectPost = (id?: string) => (state: RootState) =>
  state.posts.find(post => post.id === id)
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
