import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import ToastContext from './context'
import Toast from './Toast'
import styles from './Toaster.module.css'
import { concatClasses, newId } from '../../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const Toaster = (props) => {
  const [toasts, setToasts] = useState([])
  let transitionsCls = useRef()
  const toastsRoot = document.getElementById('toasts')

  const { position, autoClose, closeButton } = props

  useEffect(() => {
    if (!transitionsCls.current) {
      transitionsCls.current = getTransitionsCls(position)
    }
  })

  const initToast = (title, message, type) => {
    console.log('initToast called')

    if (
      typeof title === 'string' &&
      typeof message === 'string' &&
      typeof type === 'string'
    ) {
      return {
        title,
        message,
        type,
        id: newId(),
      }
    }
  }

  const toast = (title, message) =>
    setToasts([...toasts, initToast(title, message, 'default')])

  const info = (title, message) =>
    setToasts([...toasts, initToast(title, message, 'info')])

  const success = (title, message) =>
    setToasts([...toasts, initToast(title, message, 'success')])

  const error = (title, message) =>
    setToasts([...toasts, initToast(title, message, 'error')])

  const warning = (title, message) =>
    setToasts([...toasts, initToast(title, message, 'warning')])

  const remove = (id) => setToasts(toasts.filter((t) => t.id !== id))

  function getTransitionsCls(position) {
    // console.log('getTransitionsCls called')

    let transitions = {}

    if (position.match(/right/i)) {
      transitions.enter = styles.slideInRight
      transitions.enterActive = styles.slideInRightActive
      transitions.exit = styles.slideOutRight
      transitions.exitActive = styles.slideOutRightActive
    } else {
      transitions.enter = styles.slideInLeft
      transitions.enterActive = styles.slideInLeftActive
      transitions.exit = styles.slideOutLeft
      transitions.exitActive = styles.slideOutLeftActive
    }

    return transitions
  }

  const toastProps = {
    position,
    autoClose,
    closeButton,
  }

  const providerValue = {
    toast,
    info,
    success,
    error,
    warning,
    remove,
  }

  return (
    <ToastContext.Provider value={providerValue}>
      {props.children}

      {createPortal(
        <TransitionGroup
          className={concatClasses([styles.toaster, styles[position]])}
        >
          {toasts.map((t) => {
            return (
              <CSSTransition
                key={t.id}
                timeout={300}
                classNames={transitionsCls.current}
              >
                <Toast {...t} remove={() => remove(t.id)} {...toastProps} />
              </CSSTransition>
            )
          })}
        </TransitionGroup>,
        toastsRoot
      )}
    </ToastContext.Provider>
  )
}

export default Toaster
