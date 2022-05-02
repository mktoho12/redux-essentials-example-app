import { FC, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { addReaction, Post } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '💚',
  rocket: '🚀',
  eyes: '👀',
}

type Props = {
  post: Post
}

const ReactionButtons: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch()
  const [requestStatus, setRequestStatus] = useState('idle')

  const addReactionToPost = (name: string) => () => {
    try {
      setRequestStatus('pending')
      dispatch(addReaction({ postId: post.id, reaction: name }))
    } catch (err) {
      console.error('Failed to add reaction to post: ', err)
    } finally {
      setRequestStatus('idle')
    }
  }

  return (
    <div>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={addReactionToPost(name)}
        >
          {emoji} <span className="ml-2">{post.reactions[name]}</span>
        </button>
      ))}
    </div>
  )
}

export default ReactionButtons
