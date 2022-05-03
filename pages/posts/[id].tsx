import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Post from '../../features/posts/Post'
import firstIfArray from '../../lib/firstIfArray'

const PostPage: NextPage = () => {
  const router = useRouter()
  const [id, setId] = useState(router.query.id)

  useEffect(() => {
    setId(router.query.id)
  }, [router])

  return <section>{id && <Post id={firstIfArray(id)} />}</section>
}

export default PostPage
