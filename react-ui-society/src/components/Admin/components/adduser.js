import React, { useState } from 'react';
import axios from 'axios';

function UserComponent() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('RESIDENT');
  const [enabled, setEnabled] = useState('resident');

  const handleUserSubmit = () => { if (name.trim() === '') {
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


    const userData = {
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

    axios.post(`http://localhost:8085/${role}/add`, userData)
      .then((response) => {
        console.log('Success');
        alert('Profile Created Successfully');
        // Clear form after successful submission
        setName('');
        setContact('');
        setEmail('');
        setFlatNo('');
        setUsername('');
        setPassword('');
      })
      .catch((error) => {
        console.log('Issue', error);
        alert('Error in creating profile');
      });
  };

  const roles = ['resident', 'gatekeeper', 'admin'];

  return (
    <div className="container-sm mt-4">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body p-2">
              <h5 className="card-title text-center mb-4">Add Resident</h5>
              <form onSubmit={handleUserSubmit}>
              <div className="row mb-3">
              <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Enter Name</label>
                  <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                
             
                <div className="col-md-6">
                  <label htmlFor="username" className="form-label">Enter Username</label>
                  <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                </div></div>


                <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Enter email</label>
                  <input type="email" className="form-control" id="emai" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">Enter Password</label>
                  <input type="text" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                </div>
                

                <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="flatNo" className="form-label">Flat Number</label>
                  <input type="text" className="form-control" id="flatNo" onChange={(e) => setFlatNo(e.target.value)} value={flatNo} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="contact" className="form-label">Contact </label>
                  <input type="number" className="form-control" id="contact" onChange={(e) => setContact(e.target.value)} value={contact} />
                </div></div>
              

                
                <div className="row mb-3">
              <div className="col-md-6 text-center">
                  <label htmlFor="role" className="form-label">Role</label>
                  <select className="form-select" id="role" onChange={(e) => setRole(e.target.value)} value={role}>
                    {roles.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="enabled"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                  />Enabled
                </div>
                
                </div>
                <button type="submit" className="btn btn-primary" >Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserComponent;
