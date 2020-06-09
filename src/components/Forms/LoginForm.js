import React, { useState } from 'react'
import { useToast } from '../Toasts'
import Axios from 'axios'
import Form, { Email, Password, FormButton, FormActions } from '../Form'
import { Link } from 'react-router-dom'

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

export default LogInForm
