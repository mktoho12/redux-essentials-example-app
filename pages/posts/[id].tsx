import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Post from '../../features/posts/Post'
import firstIfArray from '../../lib/firstIfArray'

const PostPage: NextPage = () => {
  const router = useRouter()
  const postId = router.query.id

  return <section>{postId && <Post id={firstIfArray(postId)} />}</section>
}

export default PostPage
