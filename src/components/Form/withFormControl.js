import React from 'react'
import PropTypes from 'prop-types'
import { FormConsumer } from '.'
import styles from './Form.module.css'
import { concatClasses } from '../../helpers'
import { Link } from 'react-router-dom'

const withFormControl = (InputComponent) => {
  /*  Add structure and logical control to the input component */
  const FormControl = (props) => {
    const {
      name,
      label,
      initialValue,
      model,
      help,
      field,
      addLink,
      ...otherProps
    } = props

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
        model,
        setValue,
        ...(() => passwordStrength && { passwordStrength })(),
        ...(() =>
          field && {
            fieldConfirm: {
              name: field,
              value: fieldsData[field].value,
            },
          })(),

        ...otherProps,
      }

      return (
        <div className={concatClasses([styles.group, styles[validation]])}>
          {label ? (
            <label className={styles.label} htmlFor={name}>
              {label}
            </label>
          ) : null}
          {addLink && (
            <Link className={styles.link} to={addLink.link}>
              {addLink.label}
            </Link>
          )}
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
  field: PropTypes.string,
  disabled: PropTypes.bool,
  validation: PropTypes.oneOf(['success', 'error']),
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  addLink: PropTypes.exact({
    label: PropTypes.string,
    link: PropTypes.string,
  }),
}

export default withFormControl
