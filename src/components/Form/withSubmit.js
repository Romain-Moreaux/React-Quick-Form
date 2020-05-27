import React from 'react'
import { FormConsumer, getValues, formIsInvalid } from '.'
import useToast from '../Toasts/useToast'

const withSubmit = (Component) => (props) => {
  const toast = useToast()
  return (
    <FormConsumer>
      {({ fieldsData, setValue }) => (
        <Component
          {...props}
          submit={(e, callback, reset) => {
            e.preventDefault()
            if (callback && formIsInvalid(fieldsData)) {
              // Trigger validation check of all fields.
              Object.entries(fieldsData).forEach(([key, data]) => {
                const { value, validation, help } = data
                setValue(key, value, {
                  help,
                  forcePreviousCheck: { validation, help },
                })
              })

              toast.error(
                'formulaire invalide',
                'Le formulaire comporte des erreurs.'
              )
            } else {
              callback && callback(getValues(fieldsData))
              reset && setValue()
            }
          }}
        />
      )}
    </FormConsumer>
  )
}

export default withSubmit
