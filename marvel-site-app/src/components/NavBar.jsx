// src/components/NavBar.jsx

import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar variant="dark" expand="lg" className="p-3 mb-4">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={NavLink} to="/main" activeclassname="active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/characters" activeclassname="active">
            Characters
          </Nav.Link>
          <Nav.Link as={NavLink} to="/user-form" activeclassname="active">
            Create
          </Nav.Link>
          <NavDropdown title="More" id="basic-nav-dropdown">
            <NavDropdown.Item href="/update"> Update</NavDropdown.Item>
            <NavDropdown.Item href="/delete">Delete</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;