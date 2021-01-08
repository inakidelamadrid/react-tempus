import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const propTypes = {
  /** TimeInput onUp event */
  onUp: PropTypes.func,
  /** TimeInput onDown event */
  onDown: PropTypes.func,
  /** TimeInput onChange event */
  onChange: PropTypes.func,
  /** TimeInput onBlur event */
  onBlur: PropTypes.func,
  /** TimeInput value */
  value: PropTypes.string,
}

const defaultProps = {
  onUp: noop,
  onDown: noop,
  onChange: noop,
  onBluer: noop,
  value: '00',
}

const TimeInput = ({ onUp, onDown, onChange, onBlur, value }) => {
  return (
    <div className="time-input">
      <div className="time-input__up">
        <button onClick={onUp} type="button">
          <FontAwesomeIcon icon="chevron-up" />
        </button>
      </div>
      <div className="time-input__text">
        <input type="text" value={value} onChange={onChange} onBlur={onBlur} />
      </div>
      <div className="time-input__down">
        <button onClick={onDown} type="button">
          <FontAwesomeIcon icon="chevron-down" />
        </button>
      </div>
    </div>
  )
}

TimeInput.propTypes = propTypes
TimeInput.defaultProps = defaultProps

export default TimeInput
