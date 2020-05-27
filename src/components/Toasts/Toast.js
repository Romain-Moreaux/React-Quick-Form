import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Toaster.module.css'
import {
  FiMessageCircle,
  FiAlertTriangle,
  FiAlertCircle,
  FiCheckCircle,
  FiSquare,
  FiX,
} from 'react-icons/fi'
import { concatClasses } from '../../helpers'

const icons = {
  default: <FiSquare />,
  success: <FiCheckCircle />,
  error: <FiAlertCircle />,
  warning: <FiAlertTriangle />,
  info: <FiMessageCircle />,
}

function Toast(props) {
  const { remove, title, message, type, autoClose, closeButton } = props

  const removeRef = useRef()
  removeRef.current = remove

  useEffect(() => {
    if (parseInt(autoClose, 10)) {
      const id = setTimeout(() => removeRef.current(), autoClose)
      return () => clearTimeout(id)
    }
  }, [autoClose])

  return (
    <div className={concatClasses([styles.toast, styles[type]])}>
      {closeButton && (
        <span onClick={removeRef.current} className={styles.button}>
          {<FiX />}
        </span>
      )}
      <div className={styles.notificationImage}>{icons[type]}</div>
      <div className={styles.information}>
        <p className={styles.notificationTitle}>{title}</p>
        <p className={styles.notificationMessage}>{message}</p>
      </div>
    </div>
  )
}

Toast.defaultProps = {
  remove: () => {},
}

Toast.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning', 'default']),
  title: PropTypes.string,
  message: PropTypes.string,
  remove: PropTypes.func,
  autoClose: PropTypes.number,
  closeButton: PropTypes.bool,
}

export default Toast
