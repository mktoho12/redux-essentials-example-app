import { NextPage } from 'next'
import { useRouter } from 'next/router'
import BorderLink from '../../../components/button/BorderLink'
import EditPostForm from '../../../features/posts/EditPostForm'
import firstIfArray from '../../../util/firstIfArray'

const PostEditPage: NextPage = () => {
  const router = useRouter()
  const id = firstIfArray(router.query.id) || ''

  return (
    <section>
      <EditPostForm
        id={id}
        buttons={<BorderLink href="/">Cancel</BorderLink>}
      />
    </section>
  )
}

export default PostEditPage
