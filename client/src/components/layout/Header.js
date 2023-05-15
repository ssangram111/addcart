import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
function Header() {
  const [auth, setauth] = UseAuth();
  const [count,setcount]= useState();

  const handleLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logged out Successfully");
  };

  const getcart = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/getcart");
      setcount(res.data.cart.length);
    } catch (error) {
      console.log(error, "during post data");
    }
  };

  useEffect(() => {
   getcart();
   const interval = setInterval(() => {
    getcart();
  }, 1000); 
  return () => {
    clearInterval(interval);
  };
  }, [])
  
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="shadow-lg"
    >
      <Container fluid>
      <Navbar.Brand as={Link} to="/">
          🛒 Add Cart Task
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/Login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/Register">
                  Register
                </Nav.Link>
              
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Category
                </Nav.Link>
                <Nav.Link as={Link} to="/Cart">
                  Cart({count})
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="dropdown-item"
                  as={Link}
                  to="/Login"
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
