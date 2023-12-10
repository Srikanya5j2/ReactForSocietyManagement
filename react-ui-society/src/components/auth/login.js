import axios from 'axios';
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [param] = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(param.get('msg'));
  const navigate = useNavigate();

  const doLogin = () => {
    let token = window.btoa(username + ':' + password);

    axios.post('http://localhost:8085/user/login', {}, {
      headers: {
        'Authorization': 'Basic ' + token
      }
    })
      .then(function (response) {
        const { id, email } = response.data;
        localStorage.setItem('username', username);
        localStorage.setItem('id', id);
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userId', id);

        let role = response.data.role;
        switch (role) {
          case 'ADMIN':
            navigate('/admin/dashboard');
            break;
          case 'RESIDENT':
            navigate('/user/dashboard');
            break;
          case 'GATEKEEPER':
            navigate('/gatekeeper/dashboard');
            break;
          default:
            break;
        }
      })
      .catch(function (error) {
        setMsg('Invalid Credentials or Server Error');
        console.error('Login Error:', error);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        <a className="navbar-brand" href="#">
      <img src="logo.png" alt="Logo" className="logo-img" /> BeCommUnity
    </a>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
  <ul className="navbar-nav ml-auto">
    <li className="nav-item ">
      <a className="nav-link" href="/">
      <img src="home1.png" alt="Home" className="nav-icon" />
        Home
      </a>
    </li>
    <li className="nav-item ">
      <a className="nav-link" href="/about">
        <img src="about1.png" alt="About" className="nav-icon" />
        About
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/contact">
        <img src="contact1.png" alt="Contact" className="nav-icon" />
        Contact
      </a>
    </li>
    <li className="nav-item active">
      <a className="nav-link" href="/login">
        <img src="login.png" alt="Login/SignUp" className="nav-icon" />
        Login/SignUp
      </a>
    </li>
  </ul>
</div>
        </div>
      </nav>
    <div className="container-fluid">
      
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="Placeholder" className="mb-3" style={{ width: '70%', maxWidth: '500px' }} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-left" style={{ height: '100vh' }}>
            <form style={{ width: '100%', maxWidth: '400px' }} className="mb-3">
              <div className="text-center mb-4">
                <h2>Login</h2>
              </div>
              <div className="card-body">
                {msg !== null ?
                  <div className="alert alert-danger" role="alert">
                    {msg}
                  </div>
                  : ''}
                <div className="row " style={{ textAlign: "right" }}>
                  <div className="col-md-6">
                    <label>Enter Email/Username:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                  </div>
                </div>
                <div className="row" style={{ textAlign: "right" }}>
                  <div className="col-md-6">
                    <label>Enter Password:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', textAlign: "center" }}
                  onClick={doLogin}
                >
                  Login
                </button>
              </div>
              <div style={{ textAlign: "left" }} className="mt-4">
                <span>Don't have an Account
                  <button className="button_link" onClick={() => navigate('/signup')}>Sign Up</button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default LoginComponent;