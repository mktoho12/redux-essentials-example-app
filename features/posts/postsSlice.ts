import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import {
  addDoc,
  collection,
  doc,
  FirestoreDataConverter,
  getDoc,
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
type EditPost = Pick<Post, 'id' | 'title' | 'content'>
type NewReaction = { postId: string; reaction: string }

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
  const snapshot = await getDocs(
    collection(db, 'posts').withConverter(postConverter)
  )
  return snapshot.docs.map(doc => doc.data())
})

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (id: string) => {
    const snapshot = await getDoc(
      doc(db, 'posts', id).withConverter(postConverter)
    )
    if (!snapshot.exists()) {
      throw `Post ${id} is not found`
    }
    return snapshot.data()
  }
)

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

export const addReaction = createAsyncThunk(
  'posts/addReaction',
  async ({ postId, reaction }: NewReaction) => {
    const docRef = doc(db, 'posts', postId).withConverter(postConverter)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      throw `post ${postId} is not found`
    }
    const post = docSnap.data()
    post.reactions[reaction]++
    await setDoc(docRef, post)
    return post
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, title, content }: EditPost) => {
    const docRef = doc(db, 'posts', id).withConverter(postConverter)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      throw `post ${id} is not found`
    }
    const post = { ...docSnap.data(), title, content }
    await setDoc(docRef, post)
    return post
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    idling: state => {
      state.status = 'idle'
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
      .addCase(fetchPost.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPost.fulfilled, (state, { payload: post }) => {
        state.status = 'succeeded'
        state.posts = state.posts.filter(p => p.id !== post?.id).concat(post)
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload.id)
        if (post) {
          post.title = action.payload.title
          post.content = action.payload.content
        }
      })
      .addCase(addReaction.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload.id)
        if (post) {
          post.reactions = action.payload.reactions
        }
      })
  },
})

export default postsSlice.reducer
export const { idling } = postsSlice.actions

export const selectAllPosts = ({ posts: { posts } }: RootState) => posts

export const selectPostById =
  (id?: string) =>
  ({ posts: { posts } }: RootState) =>
    posts.find(post => post.id === id)

export const selectPostByUser = createSelector(
  [selectAllPosts, (state, userId: string) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)
