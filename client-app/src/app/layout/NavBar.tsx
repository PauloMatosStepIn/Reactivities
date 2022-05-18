import React from 'react'
import '../styles.css'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import logo from './logo.svg'

interface Props {
  openForm: () => void
}

export default function NavBar({ openForm }: Props) {
  return (
    <Navbar bg="NavColor" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Navbar.Brand>
        <img src={logo} style={{ width: '40px', height: '40px' }} /> Reactivities
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          {/* <NavDropdown title="Products">
            <NavDropdown.Item href="#">Product 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Product 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Product 3</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Promotions</NavDropdown.Item>
          </NavDropdown> */}

          <Nav.Link href="#">Activities</Nav.Link>
          <Nav.Item>
            <Button onClick={openForm} variant="success">
              Create Activity
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
