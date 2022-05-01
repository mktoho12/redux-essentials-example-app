import classNames from 'classnames'
import Link from 'next/link'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

const PrimaryLink: FC<Props> = ({ href, className, children, ...props }) => {
  return (
    <Link href={href}>
      <a
        className={classNames(
          'inline-block px-8 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring',
          className
        )}
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}

export default PrimaryLink
