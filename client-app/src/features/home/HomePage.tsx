import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { CenturyView } from 'react-calendar'
import { useNavigate } from 'react-router-dom'
import logo from '../../app/layout/logo.svg'
import { useStore } from '../../app/stores/store'
import LoginForm from '../users/LoginForm'
import RegisterForm from '../users/RegisterForm'

export default observer(function HomePage() {
  const navigate = useNavigate()
  const { userStore, modalStore } = useStore()
  return (
    <Container style={{ textAlign: 'center', marginTop: '7em' }}>
      <h1 style={{ color: 'white' }}>
        <img src={logo} style={{ width: '80px', height: '80px' }} /> Reactivities
      </h1>
      {userStore.IsLoggedIn ? (
        <Button onClick={() => navigate('/activities')} variant="primary">
          Go to Activities
        </Button>
      ) : (
        <>
          <Button className="m-1" onClick={() => modalStore.openModal(<LoginForm />)} variant="primary">
            Login
          </Button>
          <Button className="m-1" onClick={() => modalStore.openModal(<RegisterForm />)} variant="primary">
            Register
          </Button>
        </>
      )}
    </Container>
  )
})
