import { useRouter } from 'next/router'
import User from '../../features/users/User'
import firstIfArray from '../../lib/firstIfArray'
import { NextPageWithLayout } from '../_app'

const UserPage: NextPageWithLayout = () => {
  const router = useRouter()
  const userId = router.query.id
  return <section>{userId && <User id={firstIfArray(userId)} />}</section>
}

export default UserPage
