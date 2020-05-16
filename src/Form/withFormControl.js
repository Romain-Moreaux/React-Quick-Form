import React from 'react'
import PropTypes from 'prop-types'
import { FormConsumer } from '.'
import styles from './Form.module.css'

const withFormControl = (InputComponent) => {
  /*  Add structure and logical control to the input component */
  const FormControl = (props) => {
    const { name, label, initialValue, type, help, ...otherProps } = props
    /* Get past contexts as parameters and return a React element */
    function controlledChild({ fieldsData, setValue }) {
      if (!fieldsData[name]) return null
      const {
        value,
        required,
        validation,
        passwordStrength,
        help: fieldsDataHelp,
      } = fieldsData[name]

      const inputProps = {
        name,
        label,
        value: (value !== null ? value : initialValue) || '',
        required,
        type,
        setValue,
        ...(() => passwordStrength && { passwordStrength })(),
        ...otherProps,
      }

      return (
        <div className={`${styles.group} ${styles[validation]}`}>
          {label ? (
            <label className={styles.label} htmlFor={name}>
              {label}
            </label>
          ) : null}
          <InputComponent {...inputProps} />
          {(fieldsDataHelp || help) && (
            <span className={styles.help}>{fieldsDataHelp || help}</span>
          )}
        </div>
      )
    }

    return <FormConsumer>{controlledChild}</FormConsumer>
  }

  return FormControl
}

withFormControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  help: PropTypes.string,
  disabled: PropTypes.bool,
  validation: PropTypes.oneOf(['success', 'error']),
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default withFormControl
