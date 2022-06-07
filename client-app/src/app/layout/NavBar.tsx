import '../styles.css'
import { Button, Dropdown, DropdownButton, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import logo from './logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

export default observer(function NavBar() {
  const {
    userStore: { user, logout }
  } = useStore()

  const navigate = useNavigate()

  function onLogout(e: any) {
    logout()
    navigate(`/`)
  }

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
          <Nav.Item className="p-1">
            <Button as={NavLink as any} to="/createActivity" variant="primary">
              Create Activity
            </Button>
          </Nav.Item>
          <Nav.Item>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={
                <>
                  <img className="thumbnail-image rounded-circle" src={user?.image || '/assets/user.png'} alt="user pic" style={{ width: '30px' }} />
                  &nbsp;{user?.displayName || 'User'}
                </>
              }
            >
              <NavDropdown.Item href={`/profile/${user?.username}`} icon="user">
                <i className="bi-file-person" style={{ fontSize: 25 }}></i> Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={e => onLogout(e)} icon="power">
                <i className="bi-door-open" style={{ fontSize: 25 }}></i> LogOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
})
