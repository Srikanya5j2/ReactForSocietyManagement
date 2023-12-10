import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GatekeeperNavbar from './navbar';

const GetVisitorLogs = () => {
  const [visitors, setVisitors] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(5);

  useEffect(() => {
    const fetchVisitorLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8085/visitorLogs/allVisitorLogs');
        setVisitors(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchVisitorLogs();
  }, []);

  // Get current logs
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = visitors.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <GatekeeperNavbar />
      <div className="container mt-4">
        <h2>VisitorLogs</h2>
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
                <th>Visitor Contact</th>
                <th>Visitor Name</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((visitor) => (
                <tr key={visitor.id}>
                  <td>{visitor.id}</td>
                  <td>{visitor.resident?.name || 'N/A'}</td>
                  <td>{visitor.gatekeeper?.id || 'N/A'}</td>
                  <td>{visitor.entryTime}</td>
                  <td>{visitor.exitTime}</td>
                  <td>{visitor.visitorContact}</td>
                  <td>{visitor.visitorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination controls */}
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(visitors.length / logsPerPage) }, (_, index) => (
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

export default GetVisitorLogs;
