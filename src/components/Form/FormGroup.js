import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withFormControl from './withFormControl'
import styles from './Form.module.css'
import Form from './Form'

function FormGroup(props) {
  const {
    name,
    children,
    fields,
    component: Component,
    setValue,
    model,
  } = props
  console.log('FormGroup called', props)

  const [property, setProperty] = useState({})

  useEffect(() => {
    setValue(name, property)
  }, [setValue, property, name])

  const handleSetProperty = (fieldName, value) => {
    console.log('handleSetProperty called', fieldName, value)
    setProperty((prevState) => ({ ...prevState, [fieldName]: value }))
  }

  return (
    <Component fields={fields} isFormGroup className={styles.formGroup}>
      <legend className={styles.legend}>{name}</legend>
      {React.Children.map(children, (children) => {
        return React.cloneElement(
          children,
          { handleSetProperty },
          { ...children }
        )
      })}
    </Component>
  )
}

FormGroup.defaultProps = {
  model: 'FormGroup',
  component: Form,
}

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOf(['FormGroup']),
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(FormGroup)
