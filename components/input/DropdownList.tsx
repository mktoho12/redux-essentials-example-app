import cn from 'classnames'
import { FC, SelectHTMLAttributes, useId, useState } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string
}

const DropdownList: FC<Props> = ({ name, className, children, ...props }) => {
  const [focus, setFocus] = useState(false)
  const elementId = useId()

  return (
    <label
      htmlFor={elementId}
      className={cn('relative block p-3 border-2 border-gray-200 rounded-lg', {
        'bg-yellow-100 border-yellow-300': focus,
      })}
    >
      <select
        id={elementId}
        name={name}
        className={cn(
          'w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer bg-transparent',
          className
        )}
        onFocus={e => {
          props.onFocus && props.onFocus(e)
          setFocus(true)
        }}
        onBlur={e => {
          props.onBlur && props.onBlur(e)
          setFocus(false)
        }}
        {...props}
      >
        {children}
      </select>
      <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
        {name}
      </span>
    </label>
  )
}

export default DropdownList
