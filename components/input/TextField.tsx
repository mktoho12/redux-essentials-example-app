import { FC, InputHTMLAttributes, useId, useState } from 'react'
import cn from 'classnames'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string
}

const TextField: FC<Props> = ({ name, className, ...props }) => {
  const [focus, setFocus] = useState(false)
  const elementId = useId()

  return (
    <label
      className={cn('relative block p-3 border-2 border-gray-200 rounded-lg', {
        'bg-yellow-100 border-yellow-300': focus,
      })}
      htmlFor={elementId}
    >
      <input
        className={cn(
          'w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer bg-transparent',
          className
        )}
        id={elementId}
        type="text"
        placeholder={name}
        onFocus={e => {
          props.onFocus && props.onFocus(e)
          setFocus(true)
        }}
        onBlur={e => {
          props.onBlur && props.onBlur(e)
          setFocus(false)
        }}
        {...props}
      />
      <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
        {name}
      </span>
    </label>
  )
}

export default TextField
