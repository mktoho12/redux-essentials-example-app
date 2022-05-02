import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import {
  addDoc,
  collection,
  doc,
  FirestoreDataConverter,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { formatISO } from 'date-fns'

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

type NewPost = Omit<Post, 'id' | 'date' | 'reactions'>

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

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: NewPost) => {
    const newPost = {
      ...initialPost,
      date: formatISO(new Date()),
      reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    }
    const docRef = await addDoc(collection(db, 'posts'), newPost)
    return { ...newPost, id: docRef.id }
  }
)

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
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
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
