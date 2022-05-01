import Link from 'next/link'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../users/usersSlice'
import PostAuthor from './PostAuthor'
import { Post } from './postsSlice'

type Props = {
  data: Post
}

const PostSummary: FC<Props> = ({ data }) => {
  const user = useSelector(selectUser(data.user))

  return (
    <Link href={`/posts/${data.id}`}>
      <a>
        <article className="post-excerpt my-4 p-3 hover:bg-purple-50 transition-colors">
          <h3>{data.title}</h3>
          <p className="post-content">{data.content.slice(0, 100)}</p>
          <p className="text-right italic">
            <PostAuthor userId={data.user} />
          </p>
        </article>
      </a>
    </Link>
  )
}

export default PostSummary
