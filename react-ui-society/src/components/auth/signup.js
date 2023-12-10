import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('resident');

  const postUser = () => { if (name.trim() === '') {
    alert('Please enter a valid name');
    return;
  }

  if (contact.trim() === '' || !/^\d+$/.test(contact)) {
    alert('Please enter a valid numeric contact number');
    return;
  }

  if (email.trim() === '' || !/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  if (flatNo.trim() === '' || !/^\d+$/.test(flatNo)) {
    alert('Please enter a valid numeric flat number');
    return;
  }

  if (username.trim() === '') {
    alert('Please enter a valid username');
    return;
  }

  if (password.trim() === '') {
    alert('Please enter a valid password');
    return;
  }

    const user = {
      name,
      role,
      user: {
        name,
        username,
        password,
        email,
        contact,
        flatNo,
      },
    };
    if(name==='')
alert("Please Enter Valid Name")
if(username==='')
alert("Please Enter Valid Username")   
 if(password==='')
alert("Please Enter Valid Password")   
 if(email==='')
alert("Please Enter Valid Email")   
 if(contact==='')
alert("Please Enter Valid Contact")   
 if(flatNo==='')
alert("Please Enter Valid Flat Number")


    axios.post(`http://localhost:8085/${role}/add`, user)
      .then((response) => {
        console.log("Success");
        alert('Profile Created Successfully');
      })
      .catch(function (error) {
        console.log('Issue ');
        alert('Error in creating profile');
      });
  };

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
      <a className="navbar-brand" href="#">
    <img src="logo.png" alt="Logo" className="logo-img" /> BeCommUnity
  </a> </div></nav>
    <div className="container-sm mt-4">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body p-2">
             
      <h2>Sign Up</h2>

      <div className="row mb-3">
              <div className="col-md-6">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input type='text' className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
      </div>
              <div className="col-md-6">
        <label htmlFor="contact" className="form-label">Contact Number</label>
        <input type='number' className="form-control" id="contact" onChange={(e) => setContact(e.target.value)} />
      </div></div>

      <div className="row mb-3">
              <div className="col-md-6">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type='text' className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
              <div className="col-md-6">
        <label htmlFor="flatNo" className="form-label">Flat Number</label>
        <input type='number' className="form-control" id="flatNo" onChange={(e) => setFlatNo(e.target.value)} />
      </div></div>

      <div className="row mb-3">
              <div className="col-md-6">
        <label htmlFor="username" className="form-label">Username</label>
        <input type='text' className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
      </div>
              <div className="col-md-6">
        <label htmlFor="password" className="form-label">Password</label>
        <input type='text' className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
      </div></div>

      <button className="btn btn-primary" onClick={() => postUser()}>Create Profile</button>
    </div>
    </div></div></div></div></div>
  );
}

export default Signup;