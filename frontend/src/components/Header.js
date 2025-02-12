import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import './Header.css';

function Header() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar className="pink-navbar" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <Link to="/" className="navbar-brand">Allure</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/cart" className="nav-link">
                <i className="fas fa-shopping-cart"></i> Cart
              </Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <Link to="/profile" className="nav-link">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="nav-link">
                  <i className="fas fa-user"></i> Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
