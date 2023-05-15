import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Cartcontext } from "../../context/Contex";
import { UseAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { Badge } from 'antd';
function Header() {
  const [auth, setauth] = UseAuth();

  const handleLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logged out Successfully");
  };
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
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
                  Cart({state.length})
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
