import { FC, PropsWithChildren } from 'react'
import { Navbar } from '../Navbar'

type Props = PropsWithChildren<{}>

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default DefaultLayout
