import React from 'react'
import PropTypes from 'prop-types'
import styles from './Form.module.css'
import { concatClasses } from '../../helpers'

const FormActions = ({ children, css }) => {
  return (
    <div className={concatClasses([styles.formActions, css])}>{children}</div>
  )
}

export default FormActions

FormActions.propTypes = {
  children: PropTypes.node.isRequired,
  css: PropTypes.string,
}
