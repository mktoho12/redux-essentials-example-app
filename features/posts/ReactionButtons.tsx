import { FC } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { Post, reactionAdded } from './postsSlice'

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

  return (
    <div>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            dispatch(reactionAdded({ postId: post.id, reaction: name }))
          }
        >
          {emoji} <span className="ml-2">{post.reactions[name]}</span>
        </button>
      ))}
    </div>
  )
}

export default ReactionButtons
