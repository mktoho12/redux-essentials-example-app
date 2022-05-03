import classNames from 'classnames'
import { FC, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLHeadingElement>

const H2: FC<Props> = ({ children, className, ...props }) => {
  return (
    <h2 className={classNames('text-2xl', className)} {...props}>
      {children}
    </h2>
  )
}

export default H2
