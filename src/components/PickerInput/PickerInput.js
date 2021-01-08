import React, { useEffect, useCallback, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

//import styles from './styles.module.scss'

export const ICON_POSITION = {
  LEFT: 0,
  RIGHT: 1,
}

const propTypes = {
  autofocus: PropTypes.bool,
  className: PropTypes.string,
  clear: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf([ICON_POSITION.RIGHT, ICON_POSITION.LEFT]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  value: PropTypes.string,
}

const defaultProps = {
  autofocus: false,
  className: '',
  clear: false,
  disabled: false,
  icon: null,
  iconPosition: ICON_POSITION.LEFT,
  onBlur: noop,
  onChange: noop,
  onClear: noop,
  onClick: noop,
  placeholder: 'placeholder',
  readonly: false,
  value: '',
}

const PickerInput = ({
  autofocus,
  className,
  clear,
  disabled,
  icon,
  iconPosition,
  onBlur,
  onChange,
  onClear,
  onClick,
  placeholder,
  readonly,
  value,
}) => {
  const inputRef = useRef()

  const renderInput = useCallback(() => {
    return (
      <input
        className="picker-input__text"
        disabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        readOnly={readonly}
        ref={inputRef}
        style={{
          paddingLeft: icon ? '32px' : '10px',
        }}
        type="text"
        value={value}
      />
    )
  }, [
    inputRef,
    disabled,
    icon,
    onBlur,
    onChange,
    onClick,
    placeholder,
    readonly,
    value,
  ])

  const renderClear = useCallback(() => {
    const handleClear = (e) => {
      if (onClear) onClear()
      e.stopPropagation()
    }
    return (
      <span className="picker-input__clear" onClick={handleClear}>
        Clear
      </span>
    )
  }, [onClear])

  useEffect(() => {
    const { current } = inputRef
    current && autofocus && current.focus()
  }, [inputRef, autofocus])

  return (
    <div className={classNames('picker-input', className)}>
      {icon && (
        <span
          className={classNames(
            'picker-input__icon',
            iconPosition === ICON_POSITION.LEFT ? 'left' : 'right'
          )}
        >
          {icon}
        </span>
      )}
      {renderInput()}
      {clear && renderClear()}
    </div>
  )
}

PickerInput.propTypes = propTypes

PickerInput.defaultProps = defaultProps

export default React.memo(PickerInput)
