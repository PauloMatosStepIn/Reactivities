import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Container style={{ marginTop: '7em' }}>
      <h1>Home Page</h1>
      <Button onClick={() => navigate('/activities')} variant="primary">
        Goto Activities
      </Button>
    </Container>
  )
}
