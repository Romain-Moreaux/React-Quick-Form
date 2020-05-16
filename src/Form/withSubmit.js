import React from 'react'
import { FormConsumer, getValues, formIsInvalid } from '.'

const withSubmit = (Component) => (props) => {
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

              // alert(
              //   'formulaire invalide',
              //   'Le formulaire comporte des erreurs.'
              // )
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
