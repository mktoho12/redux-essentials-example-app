import Link from 'next/link'
import { FC } from 'react'
import PostAuthor from './PostAuthor'
import { Post } from './postsSlice'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'

type Props = {
  data: Post
}

const PostExcerpt: FC<Props> = ({ data: post }) => {
  return (
    <div className="flex flex-col gap-0">
      <Link href={`/posts/${post.id}`}>
        <a>
          <article className="post-excerpt mt-4 mb-1 p-3 hover:bg-purple-50 transition-colors">
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.slice(0, 100)}</p>
            <p className="text-right italic">
              <PostAuthor userId={post.user} />
              <br />
              <span className="text-sm">
                <TimeAgo timestamp={post.date} />
              </span>
            </p>
          </article>
        </a>
      </Link>
      <ReactionButtons post={post} />
    </div>
  )
}

export default PostExcerpt
