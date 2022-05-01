import { NextPage } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import Post from '../../features/posts/Post'

const first = (id: string | string[]) => (Array.isArray(id) ? id[0] : id)

const PostPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return <Error statusCode={404} />

  return <Post id={first(id)} />
}

export default PostPage
