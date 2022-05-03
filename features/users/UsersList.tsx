import Link from 'next/link'
import { FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import H2 from '../../components/heading/H2'
import { selectAllUsers } from './usersSlice'

const UsersList: FC = () => {
  const users = useAppSelector(selectAllUsers)

  const renderedUsers = users.map(user => (
    <li key={user.id}>
      <Link href={`/users/${user.id}`}>
        <a>{user.name}</a>
      </Link>
    </li>
  ))

  return (
    <section className="py-4">
      <H2>Users</H2>
      <ul className="my-4">{renderedUsers}</ul>
    </section>
  )
}

export default UsersList
