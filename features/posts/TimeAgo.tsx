import { formatDistanceToNow, parseISO } from 'date-fns'
import { FC } from 'react'

type Props = {
  timestamp: string
}

const TimeAgo: FC<Props> = ({ timestamp }) => {
  const date = parseISO(timestamp)
  const timePeriod = formatDistanceToNow(date)

  return <span title={timestamp}>&nbsp; {`${timePeriod} ago`}</span>
}

export default TimeAgo
