import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './navbar';

const PostBill = () => {
  const [billData, setBillData] = useState({
    particulars: '',
    amount: '',
    lastDate: '',
    username:'',
    contact:''
  });

  const [residentId, setResidentId] = useState('');
  const [residentList, setResidentList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8085/resident/all')
      .then(response => {
        console.log(response.data);
        setResidentList(response.data); // Assuming response.data is an array of resident objects
      })
      .catch(error => {
        console.error('Error fetching residents:', error);
      });
  }, []);
   // State to hold Resident ID
  const [message, setMessage] = useState(''); // State to store response messages

  const handleChange = (e) => {
    setBillData({ ...billData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:8085/bills/addBills/${residentId}`, billData)
      .then(response => {
        setMessage(response.data ? 'Bill added successfully!' : 'Failed to add bill');
        setBillData({
          "particulars": '',
          "amount": '',
          "lastDate": '',
          "status":''
         
        });
      })
      .catch(error => {
        setMessage('Failed to add bill');
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <AdminNavbar/>
   
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Post Bills</h2>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col">
                    <label htmlFor="particulars" className="form-label">Particulars:</label>
                    <select
                      className="form-select"
                      id="particulars"
                      name="particulars"
                      value={billData.particulars}
                      onChange={handleChange}
                    >
                      <option value="">Select Particulars</option>
                      <option value="Maintenance bills">Maintenance bills</option>
                      <option value="Extra curricular bills">Extra curricular bills</option>
                      <option value="Construction work bills">Construction work bills</option>
                      <option value="Other bills">Other bills</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="amount" className="form-label">Amount:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      name="amount"
                      value={billData.amount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="lastDate" className="form-label">Last Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="lastDate"
                      name="lastDate"
                      value={billData.lastDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="particulars" className="form-label">Status</label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={billData.status}
                      onChange={handleChange}
                    >
                      <option value="">Select status</option>
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                     
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="residentId" className="form-label">Resident :</label>
                    <select
                      className="form-select"
                      id="residentId"
                      value={residentId}
                      onChange={(e) => setResidentId(e.target.value)}
                    >
                      <option value="">Select Resident </option>
                      {residentList.map(resident => (
                        <option key={resident.id} value={resident.id}>
                          {resident.name}
                        </option>
                      ))}
                    </select>
                  </div> 
    
                </div>
                <div className="row justify-content-center mt-3">
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary">Add Bill</button>
                  </div>
                </div>
              </form>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};



export default PostBill;