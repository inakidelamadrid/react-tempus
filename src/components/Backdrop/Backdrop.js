import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import noop from 'lodash/noop'

// import styles from './styles.module.scss'

const propTypes = {
  invert: PropTypes.bool,
  show: PropTypes.bool,
  onClick: PropTypes.func
}

const defaultProps = {
  invert: false,
  show: false,
  onClick: noop
}

const Backdrop = ({ invert, onClick, show }) => {
  return (
    <React.Fragment>
      {show && (
        <div
          onClick={onClick}
          className={classNames('rc-backdrop', { invert })}
        />
      )}
    </React.Fragment>
  )
}

Backdrop.propTypes = propTypes

Backdrop.defaultProps = defaultProps

export default Backdrop
