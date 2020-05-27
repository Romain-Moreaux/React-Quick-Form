import React from 'react'
import styles from './Form.module.css'
import { concatClasses } from '../../helpers'

function DefaultButton(props) {
  const { onClick, disabled, children, css } = props

  return (
    <button
      type="button"
      className={concatClasses([styles.submit, css])}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default DefaultButton
