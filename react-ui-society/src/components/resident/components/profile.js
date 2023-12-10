import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ResidentProfile = () => {
  const [residents, setResidents] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        const userId = localStorage.getItem('id');
        console.log("UserId:", userId);
        const residentIdResponse = await axios.get(`http://localhost:8085/resident/getResidentIdByUserId/${userId}`);

        const residentId = residentIdResponse.data;

        if (residentId) {
          const residentsResponse = await axios.get(`http://localhost:8085/users/getall/${residentId}`);
          setResidents(residentsResponse.data);
        } else {
          console.error('No residentId found in response');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchResidentData();
  }, []);


 // ...

return (
  <div className="container mt-4">
    <h1 className="mb-4">Personal Information</h1>
    { residents.map((resident) => (
      <div key={resident.id} className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resident Information</h5>
              <p><strong>ID:</strong> {resident.id}</p>
              <p><strong>Name:</strong> {resident.resident.name}</p>
              <p><strong>Username:</strong> {resident.resident.user.username}</p>
              <p><strong>Email:</strong> {resident.resident.user.email}</p>
              <p><strong>Contact:</strong> {resident.resident.user.contact}</p>
              <p><strong>FlatNo:</strong> {resident.resident.user.flatNo}</p>
              <p><strong>Role:</strong> {resident.resident.user.role}</p>
              <button className="btn btn-primary" >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
    }

export default ResidentProfile;
