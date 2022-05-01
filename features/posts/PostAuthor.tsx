import { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../users/usersSlice'

type Props = {
  userId: string
}

const PostAuthor: FC<Props> = ({ userId }) => {
  const author = useSelector(selectUser(userId))
  return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor
