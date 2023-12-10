import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './navbar';

function PendingBills() {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingBills = async () => {
      try {
        const response = await axios.get('http://localhost:8085/bills/pending');
        setBills(response.data);
      } catch (error) {
        console.error('Error fetching pending bills:', error);
        setError('Error fetching data');
      }
    };

    fetchPendingBills();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h2>Pending Bills</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                 
                  <th>Resident Name</th>
                  <th>FlatNo</th>
                  <th>Resident Contact</th>
                  <th>Particulars</th>
                  <th>Amount</th>
                  <th>Last Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.id}</td>
                  
                    <td>{bill.resident.name}</td>
                    <td>{bill.resident.user.flatNo}</td>
                    <td>{bill.resident.user.contact}</td>
                    <td>{bill.particulars}</td>
                    <td>{bill.amount}</td>
                    <td>{new Date(bill.lastDate).toLocaleDateString()}</td>
                    <td>{bill.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingBills;
