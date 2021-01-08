import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
// import styles from './styles.module.scss'

import { toPaddedString } from '../../utils/FormatUtils'
import TimeInput from '../TimeInput'
import AmPmSwitch, { AM } from '../AmPmSwitch'

const propTypes = {
  /** use 24 hours format instead of 12 hrs **/
  format24Hrs: PropTypes.bool,
  /** hour to display */
  hour: PropTypes.string,

  increment: PropTypes.number,

  initialMeridiem: PropTypes.string,
  /** minute to display */
  minute: PropTypes.string,
  /** hour, minute, type change event */
  onChange: PropTypes.func,
  /** hour, minute blur event */
  onBlur: PropTypes.func
}

const defaultProps = {
  format24Hrs: false,
  hour: '00',
  increment: 1,
  initialMeridiem: AM,
  minute: '00',
  onBlur: noop,
  onChange: noop
}

const adjustValue = (value, min, max) => {
  if (isNaN(value)) {
    return 0
  }
  if (max < value) return max

  if (min > value) return min

  return value
}

const TimeContainer = ({
  format24Hrs,
  hour,
  initialMeridiem,
  minute,
  onChange,
  onBlur
}) => {
  const [time, setTime] = useState({ hour, minute })
  const [meridiem, setMeridiem] = useState(initialMeridiem)

  const handleChange = (item) => (e) => {
    const min = 0
    const max = item === 'hour' ? (format24Hrs ? 23 : 11) : 59

    const value = adjustValue(parseInt(e.currentTarget.value), min, max)

    setTime((previousTime) => ({
      ...previousTime,
      [item]: toPaddedString(value)
    }))
  }

  const handleDown = useCallback(
    (item) => () => {
      const min = 0

      setTime((prevTime) => {
        const value = parseInt(prevTime[item])
        return {
          ...prevTime,
          [item]: toPaddedString(Math.max(value - 1, min))
        }
      })
    },
    [setTime]
  )

  const handleUp = useCallback(
    (item) => () => {
      const max = item === 'hour' ? (format24Hrs ? 23 : 11) : 59

      setTime((prevTime) => {
        const value = parseInt(prevTime[item])
        return {
          ...prevTime,
          [item]: toPaddedString(Math.min(value + 1, max))
        }
      })
    },
    [format24Hrs, setTime]
  )

  // when 'time' changes internally, the effect triggers the state change up
  useEffect(() => onChange(time.hour, time.minute, meridiem), [
    meridiem,
    onChange,
    time
  ])

  return (
    <div className='time__container'>
      <TimeInput
        onUp={handleUp('hour')}
        onDown={handleDown('hour')}
        onChange={handleChange('hour')}
        value={time.hour}
      />
      <div className='time__container__div'>:</div>
      <TimeInput
        onChange={handleChange('minute')}
        onUp={handleUp('minute')}
        onDown={handleDown('minute')}
        value={time.minute}
      />
      {!format24Hrs && (
        <React.Fragment>
          <div className='time__container__div' />
          <AmPmSwitch initial={meridiem} onChange={setMeridiem} type='button' />
        </React.Fragment>
      )}
    </div>
  )
}

TimeContainer.propTypes = propTypes

TimeContainer.defaultProps = defaultProps

export default React.memo(TimeContainer)
