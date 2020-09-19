import React from 'react'
import EventForm from './components/Forms/EventForm'

function Myforms() {
  return (
    <>
      <header className="container container-sm">
        <div className="row">
          <h1 className="main-title">FillyForm</h1>
        </div>
      </header>
      {/* <div className="container container-sm">
        <div className="row">
          <header className="content-header sign-in-header">
            <h2 className="header-heading">Login Form</h2>
          </header>
          <LogInForm className="login-form" />
        </div>
      </div> */}
      {/* <div className="container container-sm">
        <div className="row">
          <header className="content-header sign-in-header">
            <h2 className="header-heading">Register Form</h2>
          </header>
          <RegisterForm className="register-form" />
        </div>
      </div> */}
      <div className="container container-sm">
        <section className="row">
          <header className="content-header sign-in-header">
            <h2 className="header-heading">Event Form</h2>
            <EventForm />
          </header>
        </section>
      </div>
    </>
  )
}

export default Myforms
