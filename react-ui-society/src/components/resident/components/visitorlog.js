import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './navbar';

const VisitorLogs = () => {
  const [visitorlogs, setVisitorlogs] = useState([]);

  useEffect(() => {
    const fetchVisitorLogsData = async () => {
      try {
        const userId = localStorage.getItem('id');
        const residentIdResponse = await axios.get(`http://localhost:8085/resident/getResidentIdByUserId/${userId}`);

        const residentId = residentIdResponse.data;

        if (residentId) {
          const visitorlogsResponse = await axios.get(`http://localhost:8085/visitorLogs/getallVisitors/${residentId}`);
          setVisitorlogs(visitorlogsResponse.data);
        } else {
          console.error('No residentId found in response');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchVisitorLogsData();
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h2>VisitorLogs</h2>
            <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark"></thead>
           
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Resident Name</th>
                  <th>GatekeeperId</th>
                  <th>Entry Time</th>
                  <th>Exit Time</th>
                  <th>Visitor Contact</th>
                  <th>Visitor Name</th>
                </tr>
              </thead>
              <tbody>
                {visitorlogs.map((visitor) => (
                  <tr key={visitor.id}>
                    <td>{visitor.id}</td>
                    <td>{visitor.resident.name}</td>
                    <td>{visitor.gatekeeper.id}</td>
                    <td>{visitor.entryTime}</td>
                    <td>{visitor.exitTime}</td>
                    <td>{visitor.visitorContact}</td>
                    <td>{visitor.visitorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default VisitorLogs;
