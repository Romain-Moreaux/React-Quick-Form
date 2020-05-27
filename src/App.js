import React from 'react'
import './App.css'
import Toaster from './components/Toasts'
import MyForms from './MyForms'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Toaster position={'topRight'} autoClose={5000} closeButton={true}>
      <Router>
        <MyForms />
      </Router>
    </Toaster>
  )
}

export default App
