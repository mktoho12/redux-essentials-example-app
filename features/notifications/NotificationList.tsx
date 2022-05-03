import { formatDistanceToNow, parseISO } from 'date-fns'
import { FC } from 'react'
import { render } from 'react-dom'
import { useAppSelector } from '../../app/hooks'
import H2 from '../../components/heading/H2'
import { selectAllUsers } from '../users/usersSlice'
import { selectAllNotifications } from './notificationsSlice'

const NotificationList: FC = () => {
  const notifications = useAppSelector(selectAllNotifications)
  const users = useAppSelector(selectAllUsers)

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknows User',
    }

    return (
      <div key={notification.id} className="notifications">
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationList">
      <H2>Notifications</H2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationList
