import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteUser() {
  const [resident, setResident] = useState([]);
  const [Admin, setAdmin]= useState([]);
  const [gatekeeper, setGatekeeper] = useState([]);
  const fetchResidents = () => {
    axios.get("http://localhost:8085/resident/all")
      .then(response => setResident(response.data))
      .catch(error => console.error("Error fetching Residents: ", error));
  };

  const fetchAdmin = () => {
    axios.get('http://localhost:8085/admin/allAdmins')
      .then(response => setAdmin(response.data))
      .catch(error => console.error("Error fetching Admins: ", error));
  };

  const fetchGatekeeper = ()=>{
    axios.get('http://localhost:8085/gatekeeper/all')
    .then(response => setGatekeeper(response.data))
    .catch(error => console.error("Error fetching Gatekeepers: ", error));
};

const deleteUser = (id) => {
  axios.delete(`http://localhost:8085/resident/delete/${id}`)
    .then(response => {
      console.log(response.data);
      fetchResidents();
      alert("deleted Success")})
    .catch(error => console.error("Error deleting user: ", error));
};



  useEffect(() => {
    fetchResidents();
    fetchAdmin();
    fetchGatekeeper();
  }, []);

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead className="thead-dark">
          <h1 style={{textAlign:"center"}}>Residents</h1>
         
           
              <tr>
                <th>Name</th>
                <th>Contact </th>
                <th>Email </th>
                <th>FlatNo</th>
                <th>Role</th>
                <th>UserName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resident.map((Resident) => (
                <tr key={Resident.id}>
                  <td>{Resident.name}</td>
                  <td>{Resident.user.contact}</td>
                  <td>{Resident.user.email}</td>
                  <td>{Resident.user.flatNo}</td>
                  <td>{Resident.user.role}</td>
                  <td>{Resident.user.username}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteUser(Resident.id)}>
                      Delete
                    </button>
                  
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
     
  
     
   
  );
              }
  
export default DeleteUser;