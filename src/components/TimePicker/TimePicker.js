import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import dayjs from '../../utils/DayJSExtend'
import { ifExistCall } from '../../utils/FunctionUtils'
import { toPaddedString } from '../../utils/FormatUtils'
import Picker, { TOP } from '../Picker'
import PickerInput from '../PickerInput'
import TimeContainer from '../TimeContainer'

//import styles from './styles.module.scss'

const inputPropTypes = {
  autoFocus: PropTypes.bool,
  clear: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
}

const defaultInputProps = {
  autoFocus: false,
  clear: false,
  disabled: false,
  placeholder: '',
  readonly: false,
}

const propTypes = {
  ...inputPropTypes,
  direction: PropTypes.number,
  icon: PropTypes.node,
  initial: PropTypes.object,
  inputComponent: PropTypes.func,
  is24Hrs: PropTypes.bool,
  onChange: PropTypes.func,
  portal: PropTypes.bool,
  showDefaultIcon: PropTypes.bool,
}

const defaultProps = {
  ...defaultInputProps,
  direction: TOP,
  icon: null,
  initial: null,
  inputComponent: null,
  is24Hrs: false,
  onChange: noop,
  portal: false,
  showDefaultIcon: false,
}

const TimePicker = ({
  autofocus,
  clear,
  direction,
  disabled,
  icon,
  initial,
  inputComponent,
  is24Hrs,
  onChange,
  placeholder,
  portal,
  readonly,
  showDefaultIcon,
}) => {
  const [date, setDate] = useState(initial || dayjs())


  const timeFormat = is24Hrs ? 'HH:mm' : 'hh:mm A'

  const [inputValue, setInputValue] = useState(date.format(timeFormat))

  const renderInputComponent = useCallback(() => {
    const handleInputBlur = (e) => {
      const value = e.currentTarget.value
      const parsed = dayjs(value, timeFormat)
      if (!parsed.isValid()) return

      setDate(parsed)
      setInputValue(value)
    }

    const handleChange = noop

    const handleInputClear = () => {
      ifExistCall(onChange, '', undefined)
      setInputValue('')
    }

    const inputProps = {
      readonly,
      autofocus,
      disabled,
      clear,
      placeholder,
      onChange: handleChange,
      onClear: handleInputClear,
      onBlur: handleInputBlur,
      value: inputValue,
      icon: showDefaultIcon ? <FontAwesomeIcon icon="calendar" /> : undefined,
    }

    return inputComponent ? (
      inputComponent({ ...inputProps })
    ) : (
      <PickerInput {...inputProps} />
    )
  }, [
    autofocus,
    clear,
    disabled,
    inputComponent,
    inputValue,
    placeholder,
    readonly,
    setInputValue,
    showDefaultIcon,
    onChange,
    timeFormat,
  ])

  const renderTime = useCallback(() => {
    if (readonly || disabled) return

    const handleChange = (hour, minute, meridiem) => {
      const time = `${hour}:${minute}`
      const value = is24Hrs ? time : `${time} ${meridiem}`

      const parsed = dayjs(value, timeFormat)

      if (!parsed.isValid()) return

      ifExistCall(onChange, value, undefined)

      setInputValue(value)
    }

    const timeContainer = (
      <TimeContainer
        hour={toPaddedString(is24Hrs ? date.hour() : date.hour() % 12)}
        initialMeridiem={date.hour() >= 12 ? 'PM' : 'AM'}
        minute={toPaddedString(date.minute())}
        onChange={handleChange}
      />
    )
    return <div className="picker__container__timeonly">{timeContainer}</div>
  }, [date, disabled, is24Hrs, onChange, readonly, timeFormat])

  return (
    <Picker
      portal={portal}
      direction={direction}
      readOnly={readonly}
      disabled={disabled}
      className="include__time"
      renderTrigger={() => renderInputComponent()}
      renderContents={() => renderTime()}
      show={autofocus}
    />
  )
}

TimePicker.propTypes = propTypes

TimePicker.defaultProps = defaultProps

export default React.memo(TimePicker)
