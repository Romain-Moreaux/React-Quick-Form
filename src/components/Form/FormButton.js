import React from 'react'
import PropTypes from 'prop-types'
import styles from './Form.module.css'
import withSubmit from './withSubmit'
import DefaultButton from './DefaultButton'
import { DotsLoader } from '../Spinner'

/**
 * A button component to handle form actions, like submit or reset.
 */
const FormButton = (props) => {
  const {
    callback,
    buttonComponent: Button,
    reset,
    loading,
    loadingComponent: Loader,
    children,
    submit,
    ...otherProps
  } = props

  return (
    <Button
      {...otherProps}
      css={styles.btnPrimary}
      onClick={(e) => submit(e, callback, reset)}
      disabled={loading}
    >
      {loading && (
        <>
          <Loader size={'sm'} />
          &nbsp;
        </>
      )}
      {children}
    </Button>
  )
}

FormButton.propTypes = {
  callback: PropTypes.func,
  loading: PropTypes.bool,
  reset: PropTypes.bool,
  children: PropTypes.node.isRequired,
  buttonComponent: PropTypes.elementType,
  loadingComponent: PropTypes.elementType,
}

FormButton.defaultProps = {
  buttonComponent: DefaultButton,
  loadingComponent: DotsLoader,
}

export default withSubmit(FormButton)
