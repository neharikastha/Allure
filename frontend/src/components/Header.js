import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header> 
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <Link to="/" className="navbar-brand">Shop-Z</Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/cart" className="nav-link">
                <i className="fas fa-shopping-cart"></i> Cart
              </Link>
              <Link to="/login" className="nav-link">
                <i className="fas fa-user"></i> Login
              </Link>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <Link to="/action1" className="dropdown-item">Action</Link>
                <Link to="/action2" className="dropdown-item">Another Action</Link>
                <Link to="/action3" className="dropdown-item">Something</Link>
                <NavDropdown.Divider />
                <Link to="/action4" className="dropdown-item">Separated Link</Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
