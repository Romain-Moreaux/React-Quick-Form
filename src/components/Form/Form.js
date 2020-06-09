import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { initiateFormFields, processField } from '.'

const defaultHelpTexts = {
  formInvalid: 'Form contains errors. Check all fields.',
  requiredField: 'This field is required.',
  minChars: 'This field should have at least :length: characters.',
  passwordInvalid: "Password isn't strong enough.",
  emailInvalid: 'This is not a valid email address.',
  urlInvalid: 'This is not a valid URL.',
  phoneInvalid: 'This is not a valid phone number.',
  dateInvalid: 'This is not a valid date format.',
  postCodeInvalid: 'This is not a valid postal code.',
  jsonInvalid: 'Enter a valid JSON.',
  fieldValid: 'This field is valid',
  fieldConfirmInvalid: 'This field should match with :field:',
}

const FieldsContext = React.createContext({})
const SetValueContext = React.createContext(() => {})

// Return the returned element from fn(children) wrapped with contexts
export const FormConsumer = ({ children }) => {
  return (
    <FieldsContext.Consumer>
      {(fieldsData) => (
        <SetValueContext.Consumer>
          {(setValue) => children({ fieldsData, setValue })}
        </SetValueContext.Consumer>
      )}
    </FieldsContext.Consumer>
  )
}

FormConsumer.propTypes = {
  children: PropTypes.func.isRequired,
}

function Form(props) {
  // if `forcedValidation` it'll skip all validation checks
  const {
    allRequired,
    forcedValidation,
    fields,
    required,
    helpTexts,
    className,
    component,
    children,
    ...rest
  } = props

  const requiredFields = allRequired ? fields : required

  const [fieldsData, setFieldsData] = useState(() => {
    return forcedValidation
      ? initiateFormFields(fields)
      : initiateFormFields(fields, requiredFields)
  })

  const [customHelpTexts, setCustomHelpTexts] = useState()

  useEffect(() => {
    setCustomHelpTexts(() =>
      typeof helpTexts === 'object' && !Array.isArray(helpTexts)
        ? Object.assign(defaultHelpTexts, helpTexts)
        : defaultHelpTexts
    )
  }, [helpTexts])

  const setValue = useCallback(
    (name, value, options) => {
      console.log('setValue called:', name, value, options)
      if (!name) {
        // If no param reset whole form
        setFieldsData(() =>
          forcedValidation
            ? initiateFormFields(fields)
            : initiateFormFields(fields, requiredFields)
        )
      } else {
        setFieldsData((fieldsData) => ({
          ...fieldsData,
          // Destructuring assignment of the returned object
          ...(() =>
            forcedValidation
              ? {
                  [name]: {
                    value,
                    validation: null,
                    required: false,
                    help: null,
                  },
                }
              : processField(
                  name,
                  value,
                  fieldsData[name].required,
                  options,
                  customHelpTexts
                ))(),
        }))
      }
    },
    [customHelpTexts, fields, forcedValidation, requiredFields]
  )

  const Component = component

  return (
    <Component className={className} {...rest}>
      <FieldsContext.Provider value={fieldsData}>
        <SetValueContext.Provider value={setValue}>
          {props.children}
        </SetValueContext.Provider>
      </FieldsContext.Provider>
    </Component>
  )
}

Form.propTypes = {
  fields: PropTypes.array.isRequired,
  required: PropTypes.array,
  allRequired: PropTypes.bool,
  component: PropTypes.string,
  children: PropTypes.node.isRequired,
  helpTexts: PropTypes.object,
  className: PropTypes.string,
  forcedValidation: PropTypes.bool,
}

Form.defaultProps = {
  component: 'form',
  forcedValidation: false,
  allRequired: false,
}

export default Form
