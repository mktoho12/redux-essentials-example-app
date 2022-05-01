import Error from 'next/error'
import Link from 'next/link'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import BorderLink from '../../components/button/BorderLink'
import PrimaryButton from '../../components/button/PrimaryButton'
import PrimaryLink from '../../components/button/PrimaryLink'
import { selectUser } from '../users/usersSlice'
import PostAuthor from './PostAuthor'
import { selectPost } from './postsSlice'

type Props = {
  id: string
}

const Post: FC<Props> = ({ id }) => {
  const post = useSelector(selectPost(id))

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
      <p className="text-right">
        <PostAuthor userId={post.user} />
      </p>
      <div className="flex justify-center gap-2">
        <PrimaryLink href={`/posts/edit/${id}`}>Edit</PrimaryLink>
        <BorderLink href="/">Back</BorderLink>
      </div>
    </section>
  ) : (
    <Error statusCode={404} />
  )
}

export default Post
