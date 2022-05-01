import Error from 'next/error'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import PrimaryButton from '../../components/button/PrimaryButton'
import TextArea from '../../components/input/TextArea'
import TextField from '../../components/input/TextField'
import { postUpdated, selectPost } from './postsSlice'

type Props = {
  id: string
  buttons?: ReactNode
}

const EditPostForm: FC<Props> = ({ id, buttons }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useAppDispatch()
  const post = useAppSelector(selectPost(id))

  const router = useRouter()

  useEffect(() => {
    if (!post) return

    setTitle(post?.title)
    setContent(post?.content)
  }, [post])

  if (!post) return <Error statusCode={404} />

  return (
    <>
      <h2 className="text-2xl my-4">Edit Post</h2>
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
          <PrimaryButton
            type="button"
            onClick={() => {
              dispatch(postUpdated({ id, title, content }))
              router.push(`/posts/${id}`)
            }}
          >
            Update
          </PrimaryButton>

          {buttons}
        </div>
      </form>
    </>
  )
}

export default EditPostForm
