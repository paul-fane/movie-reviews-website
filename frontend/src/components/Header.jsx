import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  const history = useNavigate();

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container fluid className="container--header">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {user ? (
              <>
                <Navbar.Brand>Consiglio</Navbar.Brand>
                <Nav.Link onClick={() => history("/")}>ListaFilm</Nav.Link>
                <Nav.Link onClick={() => history("/addFilm")}>
                  AggiungiFilm
                </Nav.Link>
              </>
            ) : (
              <>
                <Navbar.Brand>Consiglio</Navbar.Brand>
                <Nav.Link onClick={() => history("/index")}>ListaFilm</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link onClick={() => history(`/utente/${user.id}`)}>
                  Utente:{user.username}
                </Nav.Link>
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => history("/login")}>Login</Nav.Link>
                <Nav.Link onClick={() => history("/register")}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
