import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router';
//import './navbar.css'  ;

function GatekeeperNavbar() {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">
            <img
              src="/logo.png" // Replace this with your image path
              className="logo-img" // Add your class if needed
              alt="Logo"
            />
            BeCommUnity
          </Navbar.Brand>
          <Nav className="me-auto">
          <li class="nav-item dropdown">
          <Nav.Link onClick={() => navigate('/gatekeeper/dashboard?page=gateupdates')}className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="/gateupdates.png" alt="Bills Icon" className="nav-icon" /><br/>Gate Updates </Nav.Link>
          
          <ul className="dropdown-menu">
      <li><Nav className="dropdown-item"  onClick={() => navigate('/addvisitorlog')}>Add VisitorLogs</Nav></li>
     
      <li><Nav className="dropdown-item" onClick={() => navigate('/getvisitorlogs')}>Get VisitorLogs</Nav></li>
      <li><Nav className="dropdown-item" onClick={() => navigate('/visitorexit')}>Update VisitorLogs</Nav></li>
    </ul>
        </li>
       
     

            
           <li class="nav-item dropdown">
          <Nav.Link onClick={() => navigate('/gatekeeper/dashboard?page=courierlog')}className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="/courier-icon.png" alt="Bills Icon" className="nav-icon" /><br/>CourierLogs </Nav.Link>
          
          <ul className="dropdown-menu">
      <li><Nav className="dropdown-item" href="#" onClick={() => navigate('/gatekeeper/dashboard?page=courierlog')}>Add CourierLogs</Nav></li>
     
      <li><Nav className="dropdown-item" href="#"onClick={() => navigate('/getcourierlogs')}>Get CourierLogs</Nav></li>
      <li><Nav className="dropdown-item" href="#"onClick={() => navigate('/courierexit')}>Update CourierLogs</Nav></li>
    </ul>
        </li>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {
            
            localStorage.getItem('isLoggedIn')?
            <React.Fragment>
            <Navbar.Text >
            Welcome <span style={{color: "white"}}> 
            {localStorage.getItem('username')} 
            </span>
          </Navbar.Text>
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <button className="btn btn-info btn-sm ml-4" onClick={()=>{
            localStorage.clear();
            navigate('/home')
          }}>Logout</button>
          </React.Fragment>
          : 
          <button className="btn btn-primary" onClick={()=>navigate('/login')}>Login</button>
          }
           </Navbar.Collapse>
        </Container>
       
      </Navbar>
    </div>
  );
}

export default GatekeeperNavbar;