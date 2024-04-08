import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

//-------------------------------------------------------------
function Header() {
  return (
    <Navbar expand="xxlg" className="bg-body-tertiary" display="center">
      <Container>
        <Navbar.Brand href="/Home">Art Tatto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Appointment</Nav.Link>
            <Nav.Link href="#link">Jobs</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Logout
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Delete profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;