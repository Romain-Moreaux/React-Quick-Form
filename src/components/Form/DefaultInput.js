import React from 'react'
import styles from './Form.module.css'
import { PropTypes } from 'prop-types'

function DefaultInput(props) {
  const { name, value, placeholder, type, model, setValue } = props

  const handleSetValue = (e) => {
    const { name, value } = e.target
    setValue(name, value, { model })
  }

  return (
    <input
      className={styles.input}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={handleSetValue}
      onBlur={handleSetValue}
      value={value}
    />
  )
}

DefaultInput.defaultProps = {
  placeholder: 'placeholder for a text',
  type: 'text',
  model: 'text',
}

DefaultInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  model: PropTypes.string,
  placeholder: PropTypes.node,
  setValue: PropTypes.func.isRequired,
}

export default DefaultInput
