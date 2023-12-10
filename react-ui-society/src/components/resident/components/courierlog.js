import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './navbar';

const CourierLogs = () => {
  const [courierlogs, setCourierlogs] = useState([]);

  useEffect(() => {
    const fetchCourierLogsData = async () => {
      try {
        const userId = localStorage.getItem('id');
        const residentIdResponse = await axios.get(`http://localhost:8085/resident/getResidentIdByUserId/${userId}`);

        const residentId = residentIdResponse.data;

        if (residentId) {
          const courierlogsResponse = await axios.get(`http://localhost:8085/courierlogs/getallCouriers/${residentId}`);
          setCourierlogs(courierlogsResponse.data);
        } else {
          console.error('No residentId found in response');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchCourierLogsData();
  }, []);

  return (
    <div>
    <UserNavbar />
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <h1>Courier Logs</h1>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Resident Name</th>
                  <th>Courier Name</th>
                  <th>Entry Time</th>
                  <th>Exit Time</th>
                </tr>
              </thead>
              <tbody>
                {courierlogs.map((courier) => (
                  <tr key={courier.id}>
                    <td>{courier.resident.name}</td>
                    <td>{courier.courierName}</td>
                    <td>{courier.entryTime}</td>
                    <td>{courier.exitTime}</td>
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

export default CourierLogs;
