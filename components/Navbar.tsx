import Link from 'next/link'
import React from 'react'
import { useAppDispatch } from '../app/hooks'
import { fetchNotifications } from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useAppDispatch()

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1 className="font-[600]">Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link href="/">
              <a>Posts</a>
            </Link>
            <Link href="/users">
              <a>Users</a>
            </Link>
            <Link href="/notifications">
              <a>Notifications</a>
            </Link>
          </div>
          <button
            className="inline-block bg-[#1976d2] rounded font-bold px-6"
            onClick={fetchNewNotifications}
          >
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
