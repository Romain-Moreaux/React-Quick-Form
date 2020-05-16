import React, { useState } from 'react'
import { withFormControl } from '.'
import PropTypes from 'prop-types'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import styles from './Form.module.css'

function Password(props) {
  const {
    name,
    type,
    value,
    min,
    placeholder,
    setValue,
    passwordReset,
    toggleVisibility,
    passwordStrength,
  } = props

  const [isShow, setIsShow] = useState(false)

  //password creation
  const handleSetValue = (e) => {
    setValue(name, e.target.value, {
      type,
      min,
    })
  }

  let textColor =
    (passwordStrength === 'weak' && '#FF4136') ||
    (passwordStrength === 'medium' && '#FF851B') ||
    (passwordStrength === 'strong' && '#2ECC40') ||
    (passwordStrength === 'very strong' && '#3D9970')

  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        type={isShow ? 'text' : type}
        name={name}
        placeholder={placeholder}
        onChange={handleSetValue}
        onBlur={handleSetValue}
        value={value}
      />
      {toggleVisibility ? (
        <span
          className={styles.passwordEye_hasToggle}
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? <FiEye /> : <FiEyeOff />}
        </span>
      ) : (
        <span className={styles.passwordEye}>{<FiEye />}</span>
      )}
      {passwordReset && (
        <a
          className={styles.link}
          onClick={(e) => {
            e.preventDefault()
          }}
          href={passwordReset.link}
        >
          {passwordReset.label}
        </a>
      )}

      {type === 'passwordCreate' && (
        <span
          style={{ color: textColor }}
          className={styles.passwordIndicatorText}
        >
          {passwordStrength}
        </span>
      )}
    </div>
  )
}

Password.defaultProps = {
  type: 'password',
  passwordReset: false,
  toggleVisibility: true,
  min: 8,
}

Password.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['password', 'passwordCreate']),
  value: PropTypes.any,
  placeholder: PropTypes.node,
  setValue: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.bool,
  passwordReset: PropTypes.exact({
    label: PropTypes.string,
    link: PropTypes.string,
  }),
  min: PropTypes.number,
}

export default withFormControl(Password)
