import React from 'react'
import '../styles.css'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import logo from './logo.svg'
import { useStore } from '../stores/store'

export default function NavBar() {
  const { activityStore } = useStore()

  const { openForm } = activityStore

  return (
    <Navbar bg="NavColor" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Navbar.Brand>
        <img src={logo} style={{ width: '40px', height: '40px' }} /> Reactivities
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="#">Activities</Nav.Link>
          <Nav.Item>
            <Button onClick={() => openForm()} variant="success">
              Create Activity
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
