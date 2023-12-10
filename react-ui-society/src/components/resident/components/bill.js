import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetBill = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBillsData = async () => {
      try {
        const userId = localStorage.getItem('id');
        const residentIdResponse = await axios.get(`http://localhost:8085/resident/getResidentIdByUserId/${userId}`);

        const residentId = residentIdResponse.data;

        if (residentId) {
          const billsResponse = await axios.get(`http://localhost:8085/bills/getall/${residentId}`);
          setBills(billsResponse.data);
        } else {
          console.error('No residentId found in response');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchBillsData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <h2>Resident Bills</h2>
          <div className="form-group"></div>

          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
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
  );
};

export default GetBill;
