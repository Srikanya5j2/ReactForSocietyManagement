import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GatekeeperNavbar from './navbar';

const GetCourierLogs = () => {
  const [couriers, setCouriers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(5);

  useEffect(() => {
    const fetchCourierLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8085/courierlogs/all');
        setCouriers(response.data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchCourierLogs();
  }, []);

  // Get current logs
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = couriers.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <GatekeeperNavbar />
      <div className="container mt-4">
        <h2>CourierLogs</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Resident Name</th>
                <th>Gatekeeper ID</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((Courier) => (
                <tr key={Courier.id}>
                  <td>{Courier.id}</td>
                  <td>{Courier.resident?.name || 'N/A'}</td>
                  <td>{Courier.gatekeeper?.id || 'N/A'}</td>
                  <td>{Courier.entryTime}</td>
                  <td>{Courier.exitTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination controls */}
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(couriers.length / logsPerPage) }, (_, index) => (
            <li key={index} className="page-item">
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetCourierLogs;
