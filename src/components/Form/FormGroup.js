import React, { useEffect, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'
import Form from './Form'
import DefaultButton from './DefaultButton'

function FormGroup(props) {
  console.log('<Formgroup />', props)

  const {
    component: Component,
    children,
    label,
    name,
    moreLabel,
    buttonComponent: ButtonComponent,
    ...restProps
  } = props

  return (
    <Component isFormGroup {...restProps}>
      {children}
      <ButtonComponent>{moreLabel}</ButtonComponent>
    </Component>
  )
}

FormGroup.defaultProps = {
  model: 'group',
  moreLabel: 'Add',
  component: Form,
  buttonComponent: DefaultButton,
}

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  moreLabel: PropTypes.string,
  model: PropTypes.oneOf(['group']),
  children: PropTypes.node.isRequired,
  buttonComponent: PropTypes.elementType,
  component: PropTypes.elementType,
}

export default FormGroup
