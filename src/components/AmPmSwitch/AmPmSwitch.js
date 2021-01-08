import React, { useState } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styles from './styles.module.scss'

export const AM = 'AM'
export const PM = 'PM'

const propTypes = {
  /** TimeInput onChange event */
  onChange: PropTypes.func,
  /** TimeInput onBlur event */
  onBlur: PropTypes.func,
  /** TimeInput value */
  initial: PropTypes.string,
  type: PropTypes.oneOf(['switch', 'button'])
}

const defaultProps = {
  onChange: noop,
  onBluer: noop,
  initial: AM,
  type: 'switch'
}

const AmPmSwitch = ({ onChange, onBlur, initial, type }) => {
  const [meridiem, setMeridiem] = useState(initial)

  const handleClickDown = () => {
    setMeridiem(PM)
    onChange(PM)
  }

  const handleClickUp = () => {
    setMeridiem(AM)
    onChange(AM)
  }

  const handleToggle = () => {
    const newValue = meridiem === AM ? PM : AM
    setMeridiem(newValue)
    onChange(newValue)
  }

  return (
    <React.Fragment>
      {type === 'button' ? (
        <div className='time-input'>
          <div className='time-input__button'>
            <button type='button' onClick={handleToggle}>
              {meridiem}
            </button>
          </div>
        </div>
      ) : (
        <div className='time-input'>
          <div className='time-input__up'>
            <button
              onClick={handleClickUp}
              type='button'
              disabled={meridiem === AM}
            >
              <FontAwesomeIcon icon='chevron-up' />
            </button>
          </div>
          <div className='time-input__text'>
            <input type='text' value={meridiem} readOnly onBlur={onBlur} />
          </div>
          <div className='time-input__down'>
            <button
              onClick={handleClickDown}
              type='button'
              disabled={meridiem === PM}
            >
              <FontAwesomeIcon icon='chevron-down' />
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

AmPmSwitch.propTypes = propTypes

AmPmSwitch.defaultProps = defaultProps

export default AmPmSwitch
