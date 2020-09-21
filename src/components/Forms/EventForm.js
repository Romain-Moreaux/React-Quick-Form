import React, { useState } from 'react'
import { useToast } from '../Toasts'
import Axios from 'axios'
import Form, { Email, FormButton, FormActions, FormGroup, Input } from '../Form'

const EventForm = ({ className }) => {
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
        toast.success('success', 'successfully submitted form.')
      } else {
        toast.error('error', 'An error occurred while submitting.')
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <Form
      fields={['event', 'text']}
      allRequired
      customValidationTexts={{
        formInvalid: 'Le formulaire comporte des erreurs',
        emailInvalid: "L'adresse email n'est pas valide.",
        fieldValid: 'Ce champ est valide.',
      }}
      className={className}
    >
      <FormGroup
        fields={['email', 'event_name']}
        // required={['email', 'event_name']}
        allRequired
        name="event"
        label="event"
        moreLabel="Ajouter un enfant"
        // isFormGroup
      >
        <Email name="email" label="email" help="Veuillez saisir un email" />
        <Input
          name="event_name"
          label="event name"
          help="Veuillez saisir un evénement"
        />
      </FormGroup>
      <Input name="text" label="text" help="Veuillez saisir un text" />
      <FormActions>
        <FormButton
          callback={(fields) => handleSubmit(fields)}
          loading={loading}
          css="btn-primary"
        >
          Submit
        </FormButton>
      </FormActions>
    </Form>
  )
}

export default EventForm
