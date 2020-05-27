import React, { useState, useEffect, useCallback } from 'react'
import { withFormControl } from '.'
import PropTypes from 'prop-types'
import { FiEye, FiEyeOff, FiRepeat } from 'react-icons/fi'
import styles from './Form.module.css'
import usePrevious from '../../hooks/usePrevious'
import { concatClasses } from '../../helpers'

function Confirmator(props) {
  const {
    name,
    model,
    value,
    placeholder,
    setValue,
    toggler,
    fieldConfirm,
  } = props
  console.log('confirmator', props)

  const [isShow, setIsShow] = useState(!toggler)

  const [fieldValue, setFieldValue] = useState()
  const prevFieldValue = usePrevious(fieldValue)

  const handleSetValue = useCallback(
    (e) => {
      const fieldName = e ? e.target.name : name
      const fieldValue = e ? e.target.value : value

      setValue(fieldName, fieldValue, {
        model,
        fieldConfirm,
      })
    },
    [fieldConfirm, name, setValue, model, value]
  )

  useEffect(() => {
    if (fieldConfirm) {
      setFieldValue(fieldConfirm.value)
      if (fieldValue !== prevFieldValue) {
        fieldConfirm.value = fieldValue
        handleSetValue()
      }
    }
  }, [handleSetValue, fieldConfirm, fieldValue, prevFieldValue])

  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        type={isShow ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        onChange={handleSetValue}
        onBlur={handleSetValue}
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
        <span className={styles.fieldIcon}>{<FiRepeat />}</span>
      )}
    </div>
  )
}

Confirmator.defaultProps = {
  model: 'confirmator',
  toggler: false,
}

Confirmator.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOf(['confirmator']),
  value: PropTypes.any,
  placeholder: PropTypes.node,
  setValue: PropTypes.func.isRequired,
  toggler: PropTypes.bool,
  fieldConfirm: PropTypes.exact({
    name: PropTypes.string,
    value: PropTypes.string,
  }),
}

export default withFormControl(React.memo(Confirmator))
