import Form from './Form'
export default Form

export { FormConsumer } from './Form'

export {
  processField,
  initiateFormFields,
  updateFieldsRequirements,
  formIsInvalid,
  getValues,
} from './helpers'

export { default as withFormControl } from './withFormControl'
export { default as withSubmit } from './withSubmit'
export { default as DefaultButton } from './DefaultButton'
export { default as Email } from './Email'
export { default as Password } from './Password'
export { default as Confirmator } from './Confirmator'
export { default as FormButton } from './FormButton'
