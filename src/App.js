import React, { useState } from 'react'
import './App.css'
import Form, { Email, Password, FormButton } from './Form'
import axios from 'axios'

const LoginForm = ({ className }) => {
  // console.log('render SignForm')

  const [loading, setLoading] = useState(true)

  async function handleSubmit(fields) {
    setLoading(true)

    try {
      // Fake API login call.
      const resp = await axios.get(
        'https://reqres.in/api/login?delay=1',
        fields
      )
      console.log(resp)
      alert('Successfuly logged in!')
    } catch (err) {
      alert('There was an error during login')
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
        passwordReset={{
          link: '/password-reset',
          label: 'Mot de passe oublié ?',
        }}
        // type="passwordCreate"
      />
      {/* <FormButton reset>Reset</FormButton> */}
      <FormButton callback={(fields) => handleSubmit(fields)} loading={loading}>
        Submit
      </FormButton>
    </Form>
  )
}

function App() {
  return (
    <div className="App">
      <div className="container container-md">
        <div className="row">
          <h2>My first form</h2>
          <p>Simple login form with 2 fields</p>
          <LoginForm className="login-form" />
        </div>
      </div>
    </div>
  )
}

export default App
