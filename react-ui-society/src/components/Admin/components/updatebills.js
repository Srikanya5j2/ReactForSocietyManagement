import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const UpdateBill = ({ billId, updatedBillData }) => {
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState({});
  const navigate = useNavigate();

  // Function to fetch bills
  const fetchBills = async () => {
    try {
      const response = await axios.get('http://localhost:8085/bills/getall');
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching bills', error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [billId, updatedBillData]);

  const handleEditClick = (bill) => {
    setBill(bill);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBill({
      ...bill,
      [name]: value,
    });
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`http://localhost:8085/bills/bill/${bill.id}`, bill);
      fetchBills();
      setBill({});
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead className="thead-dark">
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
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditClick(bill)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {bill.id && (
        <div className="card mt-4">
          <div className="card-header bg-primary text-white">
            Edit Bill
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Card className="w-50">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="particulars" className="form-label">Particulars:</label>
                  <select
                    className="form-select"
                    id="particulars"
                    name="particulars"
                    value={bill.particulars}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Particulars</option>
                    <option value="Maintenance bills">Maintenance bills</option>
                    <option value="Extra curricular bills">Extra curricular bills</option>
                    <option value="Construction work bills">Construction work bills</option>
                    <option value="Other bills">Other bills</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={bill.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastDate" className="form-label">Last Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="lastDate"
                    name="lastDate"
                    value={bill.lastDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={bill.status}
                    onChange={handleInputChange}
                  >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <button
                  className="btn btn-success"
                  onClick={handleUpdateClick}
                >
                  Update Bill
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBill;
