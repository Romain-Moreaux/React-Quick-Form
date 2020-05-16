import React from 'react'
import styles from './Form.module.css'

function DefaultButton(props) {
  const { onClick, disabled, children } = props

  // console.log('DefaultButton:', props)

  return (
    <button
      type="button"
      className={styles.submit}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default DefaultButton
