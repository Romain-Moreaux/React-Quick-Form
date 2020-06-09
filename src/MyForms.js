import React from 'react'
import RegisterForm from './components/Forms/RegisterForm'
import LogInForm from './components/Forms/LoginForm'

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
