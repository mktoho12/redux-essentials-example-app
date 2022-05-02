import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { fetchPosts, selectAllPosts } from './postsSlice'
import PostExcerpt from './PostExcerpt'
import Spinner from '../../components/Spinner'

const PostsList: FC = () => {
  const dispatch = useAppDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector((state: RootState) => state.posts.status)
  const error = useSelector((state: RootState) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section className="posts-list py-4">
      <h2 className="text-2xl">Posts</h2>
      {postStatus === 'loading' ? (
        <Spinner text="Loading..." />
      ) : postStatus === 'succeeded' ? (
        orderedPosts.map(post => <PostExcerpt data={post} key={post.id} />)
      ) : postStatus === 'failed' ? (
        <div>{error}</div>
      ) : undefined}
    </section>
  )
}

export default PostsList
