import { FC } from 'react'

type Props = {
  text: string
  size: string
}

const Spinner: FC<Props> = ({ text = '', size = '5em' }) => {
  if (true) {
    console.log('aaa')
  }
  const header = text ? <h4>{text}</h4> : undefined
  return (
    <div className="spinner">
      {header}
      <div className="loader" style={{ height: size, width: size }} />
    </div>
  )
}

export default Spinner
