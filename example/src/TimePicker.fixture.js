import React, { useState } from 'react'
import { TimePicker } from 'react-tempus-library'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

dayjs.extend(customParseFormat)

const Default = () => {
  const [time, setTime] = useState(null)
  return (
    <div>
      <TimePicker onChange={setTime} />
      <div>{time}</div>
    </div>
  )
}

const fixture = {
  default: <Default />,
  autofocus: <TimePicker autofocus />,
  disabled: <TimePicker disabled />,
  initial: <TimePicker initial={dayjs('09:00 PM', 'hh:mm A')} />,
  readonly: <TimePicker readonly />
}

export default fixture
