import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './navbar';
import { useNavigate } from 'react-router';

const GetBill = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [billsPerPage] = useState(5);

  const fetchBills = async () => {
    try {
      const response = await axios.get('http://localhost:8085/bills/getall');
      if (Array.isArray(response.data)) {
        setBills(response.data);
        setError(null);
      } else {
        setError('Invalid data received from the server');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching data');
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Get current bills
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8085/bills/bill/${id}`, { status: newStatus });
      fetchBills();
    } catch (error) {
      setError('Error updating status');
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h2>Resident Bills</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ResidentName</th>
                  <th>FlatNo</th>
                  <th>Resident Contact</th>
                  <th>Particulars</th>
                  <th>Amount</th>
                  <th>Last Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBills.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.id}</td>
                    <td>{bill.resident.name}</td>
                    <td>{bill.resident.user.flatNo}</td>
                    <td>{bill.resident.user.contact}</td>
                    <td>{bill.particulars}</td>
                    <td>{bill.amount}</td>
                    <td>{new Date(bill.lastDate).toLocaleDateString()}</td>
                    <td>{bill.status}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate('/updatebills')}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination controls */}
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(bills.length / billsPerPage) }, (_, index) => (
                <li key={index} className="page-item">
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetBill;
