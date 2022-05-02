import type { NextPage } from 'next'
import AddPostForm from '../features/posts/AddPostForm'
import PostsList from '../features/posts/PostsList'

const Home: NextPage = () => {
  return (
    <>
      <section>
        <AddPostForm />
      </section>

      <PostsList />
    </>
  )
}

export default Home
