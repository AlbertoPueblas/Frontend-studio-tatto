import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../app/slice/userSlice';

//-------------------------------------------------------------
function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const logOutMe = () => {
    dispatch(logout())
  }

  return (
    <Navbar expand="xxlg" className="bg-body-tertiary" display="center">
      <Container>
        <Navbar.Brand href="/Home">Home</Navbar.Brand>
        <Navbar.Brand href="/Login" onClick={() => navigate("/login")} >Iniciar sesion</Navbar.Brand>
        <Navbar.Brand href="/Register"  >Register</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Appointment">Appointment</Nav.Link>
            <Nav.Link href="#link">Jobs</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Profile">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" onClick={() => {
            logOutMe(),navigate("/Home")}}>log out
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