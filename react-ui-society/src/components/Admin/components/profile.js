import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const ProfileComponent = () => {
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(5); // Number of profiles per page
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8085/resident/all`)
      .then(response => setResidents(response.data))
      .catch(error => console.error("Error fetching profiles", error));
  }, []);

  // Get current profiles
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = residents.slice(indexOfFirstProfile, indexOfLastProfile);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">User Profiles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Resident Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Contact</th>
            <th>FlatNo</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProfiles.map((resident) => (
            <tr key={resident.id}>
              <td>{resident.id}</td>
              <td>{resident.name}</td>
              <td>{resident.user.username}</td>
              <td>{resident.user.email}</td>
              <td>{resident.user.contact}</td>
              <td>{resident.user.flatNo}</td>
              <td>{resident.user.role}</td>
              <td>
               
                <button className="btn btn-danger" onClick={() => navigate('/deleteuser')}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <ul className="pagination justify-content-center">
        {Array.from({ length: Math.ceil(residents.length / profilesPerPage) }, (_, index) => (
          <li key={index} className="page-item">
            <button className="page-link" onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileComponent;
