import React from 'react'
import { withFormControl } from '.'
import PropTypes from 'prop-types'
import styles from './Form.module.css'

function Email(props) {
  const { name, type, value, placeholder, setValue } = props

  const handleSetValue = (e) => {
    setValue(name, e.target.value, { type })
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

Email.defaultProps = {
  type: 'email',
  placeholder: 'name@example.com',
}

Email.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email']),
  value: PropTypes.any,
  placeholder: PropTypes.node,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(Email)
