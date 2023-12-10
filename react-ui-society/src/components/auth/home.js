import React from 'react';
import './home.css'
function Home() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        <a className="navbar-brand" href="#">
      <img src="logo.png" alt="Logo" className="logo-img" /> BeCommUnity
    </a>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
  <ul className="navbar-nav ml-auto">
    <li className="nav-item active">
      <a className="nav-link" href="/">
      <img src="home1.png" alt="Home" className="nav-icon" />
        Home
      </a>
    </li>
    <li className="nav-item">
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          {/* Image with text overlay */}
          <div className="hero-image">
            <img src="homebck.png" alt="Welcome to Society Management" />
            <div className="hero-text">
              <h4>Unifying Communities Through  Society Management Solutions</h4>
              <p>Efficiently manage your society with our platform</p>
              <a href="/login" className="btn btn-primary ">Get Started</a>
            </div>
            <div className="society-image">
              <img src="homeside.png" alt="Society" />
            </div>
             
          </div>
          
        </div>
        
      </section>


      {/* Informational Cards */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Card 1 */}
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Announcements</h5>
                  <p className="card-text">Stay updated with the latest announcements from your society.</p>
                  <a href="#" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Maintenance Requests</h5>
                  <p className="card-text">Submit and track maintenance requests hassle-free.</p>
                  <a href="#" className="btn btn-primary">Submit Request</a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Events</h5>
                  <p className="card-text">Discover and RSVP for upcoming events in your society.</p>
                  <a href="#" className="btn btn-primary">Explore Events</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home