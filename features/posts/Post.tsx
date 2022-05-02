import Error from 'next/error'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import BorderLink from '../../components/button/BorderLink'
import PrimaryLink from '../../components/button/PrimaryLink'
import PostAuthor from './PostAuthor'
import { selectPostById } from './postsSlice'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'

type Props = {
  id: string
}

const Post: FC<Props> = ({ id }) => {
  const post = useSelector(selectPostById(id))

  return post ? (
    <section>
      <h2 className="text-2xl mt-4">{post.title}</h2>
      <p className="mt-4 min-h-[6rem]">
        {post.content
          .split('\n')
          .map((line, i) => <span key={i}>{line}</span>)
          .reduce((accm, line) => (
            <>
              {accm}
              <br />
              {line}
            </>
          ))}
      </p>
      <p className="text-right italic">
        <PostAuthor userId={post.user} />
        <br />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
      <div className="flex justify-center mt-4 gap-2">
        <PrimaryLink href={`/posts/edit/${id}`}>Edit</PrimaryLink>
        <BorderLink href="/">Back</BorderLink>
      </div>
    </section>
  ) : (
    <Error statusCode={404} />
  )
}

export default Post
