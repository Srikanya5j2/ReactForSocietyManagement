import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './navbar';

const HelpDeskForm = () => {
  const [residentId, setResidentId] = useState('');
  const [helpDesk, setHelpDesk] = useState({
    name: '',
    date: '',
    description: '',
    status: 'ACTIVE',
  });

  useEffect(() => {
    const fetchResidentId = async () => {
      try {
        const userId = localStorage.getItem('id');
        const residentIdResponse = await axios.get(`http://localhost:8085/resident/getResidentIdByUserId/${userId}`);
        setResidentId(residentIdResponse.data);
      } catch (error) {
        console.error('Error fetching resident ID:', error);
      }
    };

    fetchResidentId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHelpDesk({ ...helpDesk, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8085/helpdesk/addticket/${residentId}`, helpDesk);

      if (response && response.data) {
        console.log('Help Desk ticket created:', response.data);
        setHelpDesk({
          name: '',
          date: '',
          description: '',
          status: 'ACTIVE',
        });
      } else {
        console.error('Error creating Help Desk ticket. Response data is undefined.');
      }
    } catch (error) {
      console.error('Error creating Help Desk ticket:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <div><UserNavbar/>
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2>Create Help Desk Ticket</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={helpDesk.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={helpDesk.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={helpDesk.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={helpDesk.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="CLOSE">Close</option>
                    {/* Add other status options if needed */}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HelpDeskForm;
