import React from 'react'
import PropTypes from 'prop-types'
import withSubmit from './withSubmit'
import DefaultButton from './DefaultButton'
import { DotsLoader } from '../Spinner'

/**
 * A button component to handle form actions, like submit or reset.
 */
const FormButton = (props) => {
  const {
    callback,
    component: Component,
    reset,
    loading,
    loadingComponent: LoadingComponent,
    children,
    submit,
    ...otherProps
  } = props

  return (
    <Component
      {...otherProps}
      onClick={(e) => submit(e, callback, reset)}
      disabled={loading}
    >
      {loading && (
        <>
          <DotsLoader size={'sm'} />
          &nbsp;
        </>
      )}
      {children}
    </Component>
  )
}

FormButton.propTypes = {
  callback: PropTypes.func,
  loading: PropTypes.bool,
  reset: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

FormButton.defaultProps = {
  component: DefaultButton,
  loadingComponent: 'span',
}

export default withSubmit(FormButton)
