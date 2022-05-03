import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BorderLink from '../../../components/button/BorderLink'
import EditPostForm from '../../../features/posts/EditPostForm'
import firstIfArray from '../../../lib/firstIfArray'

const PostEditPage: NextPage = () => {
  const router = useRouter()
  const [id, setId] = useState<string | undefined>()

  useEffect(() => {
    setId(firstIfArray(router.query.id))
  }, [router])

  return (
    <section>
      {id && (
        <EditPostForm
          id={id}
          buttons={<BorderLink href="/">Cancel</BorderLink>}
        />
      )}
    </section>
  )
}

export default PostEditPage
