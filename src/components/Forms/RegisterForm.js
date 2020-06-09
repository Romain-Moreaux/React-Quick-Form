import React, { useState } from 'react'
import Form, {
  Email,
  Password,
  FormButton,
  Confirmator,
  FormActions,
  DatePicker,
} from '../Form'
import { useToast } from '../Toasts'
import Axios from 'axios'
import { Link } from 'react-router-dom'

const RegisterForm = ({ className }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  async function handleSubmit(fields) {
    setLoading(true)

    try {
      // Fake API login call.
      const resp = await Axios.get(
        'https://reqres.in/api/register?delay=1',
        fields
      )
      console.log(resp)
      if (resp.status === 200) {
        toast.success('success', 'Successfuly registered!')
      } else {
        toast.error('error', 'There was an error during registration')
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <Form
      fields={['email', 'password', 'passwordConfirm', 'birthdate']}
      allRequired
      className={className}
    >
      <Email name="email" label="email" help="Please enter an email" />
      <Password
        name="password"
        label="password"
        help="Please enter a password"
        model="passwordCreate"
      />
      <Confirmator
        name="passwordConfirm"
        label="password confirm"
        help="Confirm your password"
        field="password"
        toggler
      />
      <DatePicker
        name="birthdate"
        label="birthdate"
        help="Please select a date"
        field="birthdate"
        min="2015-01-01"
        max="2017-01-01"
      />
      <FormActions>
        <FormButton
          callback={(fields) => handleSubmit(fields)}
          loading={loading}
        >
          Register
        </FormButton>
        <FormButton css="btn-secondary" reset>
          Reset
        </FormButton>
      </FormActions>
      <div className="link-register">
        <p>
          Already have an account? <Link to="/register">Sign In.</Link>
        </p>
      </div>
    </Form>
  )
}

export default RegisterForm
