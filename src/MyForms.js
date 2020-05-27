import React, { useState } from 'react'
import Form, {
  Email,
  Password,
  FormButton,
  Confirmator,
} from './components/Form'
import { Link } from 'react-router-dom'
import { useToast } from './components/Toasts'
import Axios from 'axios'
import FormActions from './components/Form/FormActions'

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
      fields={['email', 'password', 'passwordConfirm']}
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

const LogInForm = ({ className }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  async function handleSubmit(fields) {
    setLoading(true)

    try {
      // Fake API login call.
      const resp = await Axios.get(
        'https://reqres.in/api/login?delay=1',
        fields
      )
      console.log(resp)
      if (resp.status === 200) {
        toast.success('success', 'Successfuly logged in!')
      } else {
        toast.error('error', 'There was an error during login')
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <Form
      fields={['email', 'password']}
      allRequired
      helpTexts={{
        formInvalid: 'Le formulaire comporte des erreurs',
        emailInvalid: "L'adresse email n'est pas valide.",
        passwordInvalid: "Le mot de passe n'est pas valide.",
        fieldValid: 'Ce champ est valide.',
        minChars: 'Ce champ doit comporter au minimum :length: caractères.',
      }}
      className={className}
    >
      <Email name="email" label="email" help="Veuillez saisir un email" />
      <Password
        name="password"
        label="password"
        help="Veuillez saisir un password"
        addLink={{
          link: '/password-reset',
          label: 'Mot de passe oublié ?',
        }}
      />
      <FormActions>
        <FormButton
          callback={(fields) => handleSubmit(fields)}
          loading={loading}
          css="btn-primary"
        >
          Submit
        </FormButton>
      </FormActions>
      <div className="link-register">
        <p>
          Don't have an account yet? <Link to="/register">Sign up.</Link>
        </p>
      </div>
    </Form>
  )
}

function Myforms() {
  return (
    <>
      <header className="container container-sm">
        <div className="row">
          <h1 className="main-title">FilliFY</h1>
        </div>
      </header>
      <div className="container container-sm">
        <div className="row">
          <header className="content-header sign-in-header">
            <h2 className="header-heading">Login Form</h2>
          </header>
          <LogInForm className="login-form" />
        </div>
      </div>
      <div className="container container-sm">
        <div className="row">
          <header className="content-header sign-in-header">
            <h2 className="header-heading">Register Form</h2>
          </header>
          <RegisterForm className="register-form" />
        </div>
      </div>
    </>
  )
}

export default Myforms
