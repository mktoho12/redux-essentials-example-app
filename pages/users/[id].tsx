import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../_app'

const UserPage: NextPageWithLayout = () => {
  const router = useRouter()
  const userId = router.query.id
  return <section></section>
}

export default UserPage
