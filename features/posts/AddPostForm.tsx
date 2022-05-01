import classNames from 'classnames'
import { FC, PropsWithChildren, ReactNode, useId, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import PrimaryButton from '../../components/button/PrimaryButton'
import DropdownList from '../../components/input/DropdownList'
import TextArea from '../../components/input/TextArea'
import TextField from '../../components/input/TextField'
import { postAdded } from './postsSlice'

type Props = {
  buttons?: ReactNode
}

const AddPostForm: FC<Props> = ({ buttons }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useAppDispatch()

  const users = useAppSelector(state => state.users)
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map(user => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ))

  return (
    <>
      <h2 className="text-2xl my-4">Add a New Post</h2>
      <form>
        <fieldset className="flex flex-col gap-4">
          <TextField
            name="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <TextArea
            name="Content"
            value={content}
            className="h-24"
            onChange={e => setContent(e.target.value)}
          />

          <DropdownList
            name="Author"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          >
            <option value=""></option>
            {usersOptions}
          </DropdownList>
        </fieldset>

        <div className="mt-4 text-center">
          <PrimaryButton
            type="button"
            onClick={() => dispatch(postAdded(title, content, userId))}
            className={classNames({ 'pointer-events-none': !canSave })}
            disabled={!canSave}
          >
            Save Post
          </PrimaryButton>

          {buttons}
        </div>
      </form>
    </>
  )
}

export default AddPostForm
