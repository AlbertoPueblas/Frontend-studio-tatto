import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, getUserData } from '../../../app/slice/userSlice';
import { useSelector } from "react-redux";
import "./Header.css"


//-------------------------------------------------------------
function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userReduxData = useSelector(getUserData) || {}

  const token = userReduxData?.token
  const userType = userReduxData?.decoded?.userRole

  const logOutMe = () => {
    dispatch(logout())
  }

  
  return (

    <Navbar expand="xlg" className="bg-body-tertiary" display="center">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Container>
        <Navbar.Brand href="/Home">Home</Navbar.Brand>
        <Navbar.Brand href="/Profile"  > Profile</Navbar.Brand>
        <Navbar.Brand href="/Register"  >Register</Navbar.Brand>
        <Navbar.Brand href="/Login" className='logIn' onClick={() => navigate("/login")} >Log In</Navbar.Brand>
        <Navbar.Brand href="/Home" className='logOut'
          onClick={() => {
            logOutMe()
          }}>log out</Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
             {/* Condicionales para mostrar unos accesos u otros dependiendo del role */}
            {userType === "Admin" ? (
              <Nav.Link href="/Appointment">Appointment</Nav.Link>
            ) : (<Nav.Link href="/AppointmentDate">Appointment</Nav.Link>)}
            {userType === "Admin" ? (
              <Nav.Link href="./Artist">Artist</Nav.Link>
            ) : (null)}
            {userType === "Admin" ? (
              <Nav.Link href="./Admin">All users</Nav.Link>
            ) : (null)}
            {userType === "Admin" ? (
              <Nav.Link href="./job" onClick={() => { navigate("/job") }}>Jobs</Nav.Link>
            ) : (null)}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;