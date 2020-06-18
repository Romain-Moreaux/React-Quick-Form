import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { withFormControl } from '.'
import PropTypes from 'prop-types'
import styles from './Form.module.css'
import { FiMail } from 'react-icons/fi'
import DefaultInput from './DefaultInput'
import { FieldsContext } from './Form'

function Email(props) {
  const {
    name,
    value,
    placeholder,
    model,
    setValue,
    component: Component,
    handleUpdate,
  } = props

  // console.log('email called', props)
  let isInitialised = useRef()
  const fieldsData = useContext(FieldsContext)

  // const handleSetValue = useCallback(
  //   (e) => {
  //     console.log('handle setValue', e.target)

  //     const { name, value } = e.target
  //     e.preventDefault()
  //     setValue(name, value, { model })
  //     handleUpdate && handleUpdate(fieldsData, setValue)
  //   },
  //   [model, setValue, handleUpdate, fieldsData]
  // )

  const handleSetValue = (e) => {
    console.log('handle setValue', e.target)
    const { name, value } = e.target
    e.preventDefault()
    setValue(name, value, { model })
    handleUpdate && handleUpdate(fieldsData, setValue)
  }

  // useEffect(() => {
  //   if (isInitialised.current) {
  //     console.log('useEffect Called Email')
  //     handleUpdate && handleUpdate(fieldsData, setValue)
  //   }
  //   isInitialised.current = true
  // }, [fieldsData, handleUpdate, setValue])

  return (
    <div className={styles.field}>
      <Component
        name={name}
        type="email"
        placeholder={placeholder}
        handleSetValue={handleSetValue}
        value={value}
      />
      <span className={styles.fieldIcon}>{<FiMail />}</span>
    </div>
  )
}

Email.defaultProps = {
  model: 'email',
  placeholder: 'name@example.com',
  component: DefaultInput,
}

Email.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOf(['email']),
  value: PropTypes.any,
  placeholder: PropTypes.node,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(React.memo(Email))
