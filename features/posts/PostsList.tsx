import { FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import PostSummary from './PostSummary'

const PostsList: FC = () => {
  const posts = useAppSelector(state => state.posts)

  return (
    <section className="posts-list py-4">
      <h2 className="text-2xl">Posts</h2>
      {posts.map(post => (
        <PostSummary data={post} key={post.id} />
      ))}
    </section>
  )
}

export default PostsList