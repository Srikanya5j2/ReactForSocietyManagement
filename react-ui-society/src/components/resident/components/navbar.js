import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router';
//import './navbar.css'  ;

function UserNavbar() {
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
            <Nav.Link  onClick={() => navigate('/user/dashboard?page=bills')}><img src="/bills-icon.png" alt="Bills Icon" className="nav-icon" /><br/>Bills</Nav.Link>
            
       
            <Nav.Link  onClick={() => navigate('/user/dashboard?page=events')}><img src="/events-icon.png" alt="Bills Icon" className="nav-icon" /><br/>Events</Nav.Link>
            {/*<Nav.Link  onClick={() => navigate('/user/dashboard?page=helpdesk')}>Helpdesk</Nav.Link>
            <Nav.Link  onClick={() => navigate('/user/dashboard?page=viewresponse')}>View response</Nav.Link>*/}
            <li class="nav-item dropdown">
          <Nav.Link onClick={() => navigate('/user/dashboard?page=gateupdates')}className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="/helpdesk-icon.png" alt="Bills Icon" className="nav-icon" /> <br/>Helpdesk</Nav.Link>
          
          <ul className="dropdown-menu">
      <li><Nav.Link className="dropdown-item" href="#" onClick={() => navigate('/helpdesk')}>AddTickets</Nav.Link></li>
     
      <li><a className="dropdown-item" href="#"onClick={() => navigate('/viewresponse')}>View Response</a></li>
    </ul>
        </li>
            <Nav.Link onClick={() => navigate('/user/dashboard?page=notices')}><img src="/notices-icon.png" alt="Bills Icon" className="nav-icon" /><br/>Notices</Nav.Link>
            
            
            <li class="nav-item dropdown">
          <Nav.Link onClick={() => navigate('/user/dashboard?page=gateupdates')}className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="/gateupdates.png" alt="Bills Icon" className="nav-icon" /><br/>Gate Updates </Nav.Link>
          
          <ul className="dropdown-menu">
      <li><Nav.Link className="dropdown-item" href="#" onClick={() => navigate('/visitorlog')}>VisitorLogs</Nav.Link></li>
     
      <li><a className="dropdown-item" href="#"onClick={() => navigate('/courierlog')}>Courier Log</a></li>
    </ul>
        </li>
            <Nav.Link onClick={() => navigate('/user/dashboard?page=profile')}> <img src="/profile-user.png" alt="Bills Icon" className="nav-icon" /><br/>My Profile</Nav.Link>
           
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

export default UserNavbar;