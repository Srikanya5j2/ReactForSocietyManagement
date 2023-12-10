import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

const UpdateUser = ({ residentId, updatedResidentData }) => {
  const [residents, setResidents] = useState([]);
  const [resident, setResident] = useState({});
  const navigate = useNavigate();

  const fetchResidents = async () => {
    try {
      const response = await axios.get('http://localhost:8085/resident/all');
      setResidents(response.data);
    } catch (error) {
      console.error('Error fetching residents', error);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, [residentId, updatedResidentData]);

  const handleEditClick = (resident) => {
    setResident(resident);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setResident({
      ...resident,
      [name]: inputValue,
    });
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`http://localhost:8085/resident/update/${resident.id}`, resident);
      console.log('Update successful'); // Add console log to check if the update is triggered
      fetchResidents(); // Assuming this function retrieves the updated data
      setResident({}); // Reset resident state after update
    } catch (error) {
      console.error('Error updating resident:', error);
    }
  };
  console.log('Residents:', residents); // Log the residents array
  console.log('Current resident:', resident);

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
           
            <th>Contact</th>
            <th>Email</th>
            <th>FlatNo</th>
            <th>Role</th>
           
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((Resident) => (
            <tr key={Resident.id}>
              <td>{Resident.name}</td>
             
              <td>{Resident.user.contact}</td>
              <td>{Resident.user.email}</td>
              <td>{Resident.user.flatNo}</td>
              <td>{Resident.user.role}</td>
            
              <td>
                <button className="btn btn-primary" onClick={() => handleEditClick(Resident)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {resident.id && (
        <div className="card mt-4">
          <div className="card-header bg-primary text-white">
            Update Resident
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Card className="w-50">
              <div className="card-body">
                <Form>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={resident.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <div className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={resident.email} onChange={handleInputChange} /> 
          </div>
         
         
          <div className="mb-3">
          <Form.Label>Contact:</Form.Label>
          <Form.Control type="text" name="contact" value={resident.contact} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
          <Form.Label>FlatNo:</Form.Label>
          <Form.Control type="text" name="flatNo" value={resident.flatNo} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
          <Form.Label>Role:</Form.Label>
          <Form.Control type="text" name="role" value={resident.role} onChange={handleInputChange} />
          </div>
         
          <button
                  className="btn btn-success"
                  onClick={handleUpdateClick}
                >
                  Update User
                </button>
                </Form>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
