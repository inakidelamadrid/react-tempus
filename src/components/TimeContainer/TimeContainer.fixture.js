import { useState } from 'react'
import TimeContainer from './index'

const Default = () => {
  const [time, setTime] = useState('')

  const handleChange = (hour, minute, meridiem) => {
    setTime(`${hour}:${minute} ${meridiem}`)
  }

  return (
    <div>
      <TimeContainer onChange={handleChange} />
      <div> {time} </div>
    </div>
  )
}
const fixture = {
  default: <Default />,
  'with values': <TimeContainer hour="11" minute="59" />,
  format24Hrs: <TimeContainer format24Hrs />,
}

export default fixture
