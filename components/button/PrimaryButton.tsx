import classNames from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const PrimaryButton: FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      className={classNames(
        'inline-block px-8 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
