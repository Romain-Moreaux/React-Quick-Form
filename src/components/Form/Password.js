import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import { withFormControl } from '.'
import PropTypes from 'prop-types'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import styles from './Form.module.css'
import { concatClasses } from '../../helpers'
import DefaultInput from './DefaultInput'
import { FieldsContext } from './Form'

function Password(props) {
  const {
    name,
    model,
    value,
    handleUpdate,
    min,
    component: Component,
    placeholder,
    setValue,
    toggler,
    passwordStrength,
  } = props
  // console.log('password called')
  let isInitialised = useRef()
  const fieldsData = useContext(FieldsContext)

  const [isShow, setIsShow] = useState(!toggler)

  const handleSetValue = (e) => {
    const { name, value } = e.target
    setValue(name, value, {
      model,
      min,
    })
    handleUpdate && handleUpdate(fieldsData, setValue)
  }
  // const handleSetValue = useCallback(
  //   (e) => {
  //     const { name, value } = e.target
  //     setValue(name, value, {
  //       model,
  //       min,
  //     })
  //     handleUpdate && handleUpdate(fieldsData, setValue)
  //   },
  //   [min, model, setValue, fieldsData, handleUpdate]
  // )

  // useEffect(() => {
  //   if (isInitialised.current) {
  //     console.log('useEffect Called Password')
  //     handleUpdate && handleUpdate(fieldsData, setValue)
  //   }
  //   isInitialised.current = true
  // }, [fieldsData, handleUpdate, setValue])

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
