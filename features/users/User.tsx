import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import H2 from '../../components/heading/H2'
import useIdlingPostSlice from '../../hooks/IdlingPostSlice'
import { fetchPosts, selectPostByUser } from '../posts/postsSlice'
import { selectUserById } from './usersSlice'

type Props = {
  id: string
}

const User: FC<Props> = ({ id }) => {
  const user = useAppSelector((state: RootState) => selectUserById(state, id))

  const dispatch = useAppDispatch()
  const postStatus = useAppSelector((state: RootState) => state.posts.status)
  const posts = useAppSelector((state: RootState) =>
    selectPostByUser(state, id)
  )

  useIdlingPostSlice()

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  return user ? (
    <div>
      <h1 className="text-2xl mt-4">{user.name}</h1>

      <section className="p-0 my-4">
        <H2>Posts</H2>
        <ul>
          {posts
            .filter(post => post.user === user.id)
            .map(post => (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  ) : (
    <></>
  )
}

export default User
