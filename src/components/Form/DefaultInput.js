import React from 'react'
import styles from './Form.module.css'
import { PropTypes } from 'prop-types'

function DefaultInput(props) {
  const { name, value, placeholder, type, handleSetValue, ...rest } = props

  return (
    <input
      className={styles.input}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={handleSetValue}
      onBlur={handleSetValue}
      value={value}
      {...rest}
    />
  )
}

DefaultInput.defaultProps = {
  placeholder: 'placeholder for a text',
  type: 'text',
}

DefaultInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.node,
  handleSetValue: PropTypes.func,
}

export default DefaultInput
