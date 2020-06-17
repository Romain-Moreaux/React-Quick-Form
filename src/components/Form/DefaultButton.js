import React from 'react'
import styles from './Form.module.css'
import PropTypes from 'prop-types'
import { concatClasses } from '../../helpers'

function DefaultButton(props) {
  const { onClick, disabled, children, css } = props
  return (
    <button
      type="button"
      className={concatClasses([styles.button, css])}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

DefaultButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  css: PropTypes.string,
}

DefaultButton.defaultProps = {
  onClick: () => {},
}

export default DefaultButton
