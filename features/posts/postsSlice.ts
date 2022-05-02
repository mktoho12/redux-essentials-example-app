import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { collection, FirestoreDataConverter, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase'

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

type PostsState = {
  posts: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: undefined,
}

const postConverter: FirestoreDataConverter<Post> = {
  toFirestore: (post: Post) => post,
  fromFirestore: snapshot => {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      date: data.date,
      title: data.title,
      content: data.content,
      user: data.user,
      reactions: data.reactions,
    }
  },
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const snapshot = await getDocs(
    collection(db, 'posts').withConverter(postConverter)
  )
  return snapshot.docs.map(doc => doc.data())
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: ({ posts, status, error }, { payload }: PayloadAction<Post>) => {
        posts.push(payload)
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
      { posts, status, error },
      {
        payload: { id, title, content },
      }: PayloadAction<Pick<Post, 'id' | 'title' | 'content'>>
    ) => {
      const post = posts.find(post => post.id === id)
      if (!post) return
      post.title = title
      post.content = content
    },

    reactionAdded: (
      { posts, status, error },
      {
        payload: { postId, reaction },
      }: PayloadAction<{ postId: string; reaction: string }>
    ) => {
      const existingPost = posts.find(post => post.id === postId)
      existingPost &&
        (existingPost.reactions[reaction] =
          (existingPost.reactions[reaction] || 0) + 1)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default postsSlice.reducer

export const selectAllPosts = ({
  posts: { posts, status, error },
}: RootState) => posts

export const selectPostById =
  (id?: string) =>
  ({ posts: { posts, status, error } }: RootState) =>
    posts.find(post => post.id === id)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
