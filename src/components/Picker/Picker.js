import React, { useEffect, useState, useRef, useCallback } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
//import styles from './styles.module.scss'

import Backdrop from '../Backdrop'
import { getDivPosition, getDomHeight } from './DOMUtils'

export const TOP = 0
export const BOTTOM = 1

const propTypes = {
  className: PropTypes.string,
  direction: PropTypes.number,
  disabled: PropTypes.bool,
  portal: PropTypes.bool,
  readonly: PropTypes.bool,
  renderContents: PropTypes.func,
  renderTrigger: PropTypes.func,
  show: PropTypes.bool,
}

const defaultProps = {
  className: '',
  direction: TOP,
  disabled: false,
  portal: false,
  readonly: false,
  renderContents: noop,
  renderTrigger: noop,
  show: false,
}

const Picker = ({
  className,
  direction,
  disabled,
  portal,
  readonly,
  renderContents,
  renderTrigger,
  show,
}) => {
  const [_show, _setShow] = useState(show)
  const [position, setPosition] = useState({ left: '', top: '' })
  const contentsRef = useRef()
  const triggerRef = useRef()

  const calculatePosition = useCallback(() => {
    setPosition(
      getDivPosition(
        triggerRef.current,
        direction,
        getDomHeight(contentsRef.current)
      )
    )
  }, [direction, contentsRef, setPosition, triggerRef])

  const showContents = useCallback(() => {
    if (disabled || readonly) return
    _setShow(true)
  }, [disabled, readonly, _setShow])

  useEffect(calculatePosition, [calculatePosition, _show])

  const actions = {
    show: showContents,
    hide: () => _setShow(false),
  }

  return (
    <div className="picker">
      <div className="picker__trigger" onClick={showContents} ref={triggerRef}>
        {renderTrigger({ actions })}
      </div>
      {_show && (
        <div
          className={classNames('picker__container', { portal, className })}
          role="dialog"
          aria-modal="true"
          style={position}
          ref={contentsRef}
        >
          {renderContents({ actions })}
        </div>
      )}
      <Backdrop show={_show} invert={portal} onClick={() => _setShow(false)} />
    </div>
  )
}

Picker.propTypes = propTypes

Picker.defaultProps = defaultProps

export default Picker
