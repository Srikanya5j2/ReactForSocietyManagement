import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GatekeeperNavbar from './navbar';

const VisitorExit = () => {
  const [visitorLogId, setVisitorLogId] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [visitorLogs, setVisitorLogs] = useState([]); // State to store visitor logs fetched from the API

  useEffect(() => {
    // Fetch Visitor Logs from the API
    const fetchVisitorLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8085/visitorLogs/allVisitorLogs');
        setVisitorLogs(response.data);
      } catch (error) {
        console.error('Error fetching Visitor Logs:', error);
      }
    };

    fetchVisitorLogs();
  }, []);

  const handleUpdateExitTime = async () => {
    try {
      const response = await axios.put(`http://localhost:8085/visitorLogs/exit/${visitorLogId}`, {
        exitTime: exitTime,
      });

      console.log('Exit time updated:', response.data);
      // Handle success response here
    } catch (error) {
      console.error('Error updating exit time:', error.response ? error.response.data : error.message);
      // Handle error response here
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateExitTime();
  };

  return (
    <div>
      <GatekeeperNavbar/>
    <div className="container mt-4">
      <h1>Update Exit Time</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="visitorLogId" className="form-label">Visitor Log ID:</label>
          <select
            className="form-control"
            id="visitorLogId"
            value={visitorLogId}
            onChange={(e) => setVisitorLogId(e.target.value)}
          >
            <option value="">Select Visitor Log ID</option>
            {visitorLogs.map((log) => (
              <option key={log.id} value={log.id}>{log.id}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exitTime" className="form-label">New Exit Time:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="exitTime"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Exit Time</button>
      </form>
    </div>
    </div>
  );
};

export default VisitorExit;
