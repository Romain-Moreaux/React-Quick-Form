import React from 'react'
import { withFormControl } from '.'
import PropTypes from 'prop-types'
import styles from './Form.module.css'
import { FiMail } from 'react-icons/fi'

function Email(props) {
  const { name, value, placeholder, model, setValue } = props
  console.log('Email', props)

  const handleSetValue = (e) => {
    const { name, value } = e.target
    setValue(name, value, { model })
  }

  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        name={name}
        type="email"
        placeholder={placeholder}
        onChange={handleSetValue}
        onBlur={handleSetValue}
        value={value}
      />
      <span className={styles.fieldIcon}>{<FiMail />}</span>
    </div>
  )
}

Email.defaultProps = {
  model: 'email',
  placeholder: 'name@example.com',
}

Email.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOf(['email']),
  value: PropTypes.any,
  placeholder: PropTypes.node,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(React.memo(Email))
