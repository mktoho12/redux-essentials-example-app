import {
  FC,
  TextareaHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import cn from 'classnames'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
}

const TextArea: FC<Props> = ({ name, className, onChange, ...props }) => {
  const [focus, setFocus] = useState(false)
  const elementId = useId()

  const input = useRef<HTMLTextAreaElement>(null)
  const [heightStyle, setHeightStyle] = useState<string | undefined>(undefined)

  useEffect(() => {
    setHeightStyle(`${input.current?.scrollHeight}px`)
  }, [onChange])

  return (
    <label
      htmlFor={elementId}
      className={cn('relative block p-3 border-2 border-gray-200 rounded-lg', {
        'bg-yellow-100 border-yellow-300': focus,
      })}
    >
      <textarea
        id={elementId}
        name={name}
        className={cn(
          'w-full px-0 mt-4 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer bg-transparent',
          className
        )}
        style={heightStyle ? { height: heightStyle } : undefined}
        placeholder={name}
        onFocus={e => {
          props.onFocus && props.onFocus(e)
          setFocus(true)
        }}
        onBlur={e => {
          props.onBlur && props.onBlur(e)
          setFocus(false)
        }}
        onChange={e => {
          onChange && onChange(e)
          setHeightStyle(`${e.target.scrollHeight}px`)
        }}
        ref={input}
        {...props}
      />
      <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
        {name}
      </span>
    </label>
  )
}

export default TextArea
