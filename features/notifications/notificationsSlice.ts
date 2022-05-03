import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  collection,
  FirestoreDataConverter,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { RootState } from '../../app/store'
import { db } from '../../lib/firebase'

type Notification = {
  id: string
  message: string
  user: string
  date: string
}

const initialState: Notification[] = []

const notificationConverter: FirestoreDataConverter<Notification> = {
  toFirestore: (notification: Notification) => notification,
  fromFirestore: snapshot => {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      message: data.message,
      user: data.user,
      date: data.date,
    }
  },
}

export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  { state: RootState }
>('notifications/fetchNotifications', async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState())
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification ? latestNotification.date : ''
  const notificationRef = collection(db, 'notifications').withConverter(
    notificationConverter
  )
  const q = query(
    notificationRef,
    where('date', '>', latestTimestamp),
    orderBy('date', 'desc')
  )
  const snap = await getDocs(q)

  return snap.docs.map(doc => doc.data())
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export default notificationsSlice.reducer

export const selectAllNotifications = (state: RootState) => state.notifications
