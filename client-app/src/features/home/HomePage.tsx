import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { CenturyView } from 'react-calendar'
import { useNavigate } from 'react-router-dom'
import logo from '../../app/layout/logo.svg'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Container style={{ textAlign: 'center', marginTop: '7em' }}>
      <h1 style={{ color: 'white' }}>
        <img src={logo} style={{ width: '80px', height: '80px' }} /> Reactivities
      </h1>
      <Button onClick={() => navigate('/activities')} variant="primary">
        Goto Activities
      </Button>
    </Container>
  )
}
