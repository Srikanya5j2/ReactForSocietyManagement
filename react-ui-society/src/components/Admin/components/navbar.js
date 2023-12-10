import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './navbar.css' ;

function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <div classNameName="mb-4">
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
            <Nav.Link  onClick={() => navigate('/admin/dashboard?page=bills')}><img src="/bills-icon.png" alt="Bills Icon" className="nav-icon" /><br/>Bills</Nav.Link>
            
            <Nav.Link  onClick={() => navigate('/admin/dashboard?page=events')}><img src="/events-icon.png" alt="Bills Icon" className="nav-icon" /><br/>Events</Nav.Link>
            <Nav.Link  onClick={() => navigate('/admin/dashboard?page=helpdesk')}><img src="/helpdesk-icon.png" alt="Bills Icon" className="nav-icon" /><br/>Helpdesk</Nav.Link>
            <Nav.Link onClick={() => navigate('/admin/dashboard?page=notices')}><img src="/notices-icon.png" alt="Bills Icon" className="nav-icon" /><br/>Notices</Nav.Link>
           
            <Nav.Link onClick={() => navigate('/admin/dashboard?page=adduser')}><img src="/addres-icon.png" alt="Bills Icon" className="nav-icon" /><br/>Add Resident</Nav.Link>
            <Nav.Link onClick={() => navigate('/admin/dashboard?page=profile')}><img src="/alluser-icon.png" alt="Bills Icon" className="nav-icon" /><br/>All Users</Nav.Link>
           
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

export default AdminNavbar;
