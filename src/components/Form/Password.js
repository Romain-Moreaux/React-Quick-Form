import React, { useState } from 'react'
import { withFormControl } from '.'
import PropTypes from 'prop-types'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import styles from './Form.module.css'
import { concatClasses } from '../../helpers'
import DefaultInput from './DefaultInput'

function Password(props) {
  const {
    name,
    model,
    value,
    handleSetProperty,
    min,
    component: Component,
    placeholder,
    setValue,
    toggler,
    passwordStrength,
  } = props
  // console.log('password called')

  // useRef ?
  const [isShow, setIsShow] = useState(!toggler)

  const handleSetValue = (e) => {
    const { name, value } = e.target
    console.log('password')
    if (handleSetProperty) {
      console.log('setValues from password')
      handleSetProperty(name, value)
    }
    setValue(name, value, {
      model,
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
      <Component
        type={isShow ? 'text' : 'password'}
        name={name}
        min={min}
        placeholder={placeholder}
        handleSetValue={handleSetValue}
        value={value}
      />
      {toggler ? (
        <span
          className={concatClasses([styles.fieldIcon, styles.fieldBtn])}
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? <FiEye /> : <FiEyeOff />}
        </span>
      ) : (
        <span className={styles.fieldIcon}>{<FiEyeOff />}</span>
      )}

      {model === 'passwordCreate' && (
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
  component: DefaultInput,
  model: 'password',
  toggler: true,
  min: 8,
}

Password.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOf(['password', 'passwordCreate']),
  value: PropTypes.any,
  placeholder: PropTypes.node,
  setValue: PropTypes.func.isRequired,
  toggler: PropTypes.bool,
  min: PropTypes.number,
}

export default withFormControl(React.memo(Password))
