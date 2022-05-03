import Error from 'next/error'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import PrimaryButton from '../../components/button/PrimaryButton'
import TextArea from '../../components/input/TextArea'
import TextField from '../../components/input/TextField'
import Spinner from '../../components/Spinner'
import useIdlingPostSlice from '../../hooks/IdlingPostSlice'
import { fetchPost, selectPostById, updatePost } from './postsSlice'

type Props = {
  id: string
  buttons?: ReactNode
}

const EditPostForm: FC<Props> = ({ id, buttons }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useAppDispatch()
  const post = useAppSelector(selectPostById(id))
  const postStatus = useAppSelector((state: RootState) => state.posts.status)

  const router = useRouter()

  const [requestStatus, setRequestStatus] = useState('idle')
  useIdlingPostSlice()

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPost(id))
    }
  }, [dispatch, postStatus, id])

  const dispatchUpdatePost = () => {
    try {
      setRequestStatus('pending')
      dispatch(updatePost({ id, title, content }))
      router.push(`/posts/${id}`)
    } catch (err) {
      console.error('Failed to update the post: ', err)
    } finally {
      setRequestStatus('idle')
    }
  }

  useEffect(() => {
    if (!post) return

    setTitle(post.title)
    setContent(post.content)
  }, [post])

  return (
    <div>
      <h2 className="text-2xl my-4">Edit Post</h2>

      {postStatus === 'failed' ? (
        <Error statusCode={404} />
      ) : postStatus === 'loading' ? (
        <Spinner size="80" text="loading..." />
      ) : (
        <form>
          <fieldset className="flex flex-col gap-4">
            <TextField
              name="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <TextArea
              name="content"
              className="h-24"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </fieldset>

          <div className="mt-4 flex justify-center gap-4">
            <PrimaryButton type="button" onClick={dispatchUpdatePost}>
              Update
            </PrimaryButton>

            {buttons}
          </div>
        </form>
      )}
    </div>
  )
}

export default EditPostForm
