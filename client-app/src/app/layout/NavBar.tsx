import '../styles.css'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import logo from './logo.svg'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <Navbar bg="NavColor" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Navbar.Brand as={NavLink as any} to="/">
        <img src={logo} style={{ width: '40px', height: '40px' }} /> Reactivities
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link as={NavLink} to="/activities">
            Activities
          </Nav.Link>
          <Nav.Link as={NavLink} to="/errors">
            Errors
          </Nav.Link>
          <Nav.Item>
            <Button as={NavLink as any} to="/createActivity" variant="success">
              Create Activity
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
