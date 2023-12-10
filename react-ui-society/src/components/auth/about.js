import React from 'react';

function About() {
  return (<>
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
    <li className="nav-item active">
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
    <li className="nav-item">
      <a className="nav-link" href="/login">
        <img src="login.png" alt="Login/SignUp" className="nav-icon" />
        Login/SignUp
      </a>
    </li>
  </ul>
</div>
        </div>
      </nav>

      
      <div
        className="container-fluid p-0 position-relative"
        style={{
          backgroundImage: "url('homebck.png')", // Change to your About page background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingTop: '10px', // Adjust as needed for spacing from the top
        }}
      >
        <div className="container text-white">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              <h2>About Us</h2>
              <p>Welcome to our Society Management platform. We strive to provide efficient solutions for managing your society's needs.</p>
              <p>Our platform helps in handling announcements, maintenance requests, organizing events, and much more.</p>
              <p>Get in touch with us to explore how we can assist in simplifying your society management tasks.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
