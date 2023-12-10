import axios from 'axios';
import { useState, useEffect } from 'react';

function AddCourierLogs() {
  const [residentId, setResidentId] = useState('');
  const [gatekeeperId, setGatekeeperId] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [courierName, setCourierName] = useState('');

  const [residents, setResidents] = useState([]);
  const [gatekeepers, setGatekeepers] = useState([]);

  useEffect(() => {
    const fetchGatekeepers = async () => {
      try {
        const response = await axios.get('http://localhost:8085/gatekeeper/all');
        setGatekeepers(response.data);
      } catch (error) {
        console.error('Error fetching gatekeepers:', error);
      }
    };

    const fetchResidents = async () => {
      try {
        const response = await axios.get('http://localhost:8085/resident/all');
        setResidents(response.data);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchGatekeepers();
    fetchResidents();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const courierLogData = {
      entryTime: entryTime,
      exitTime: exitTime,
      courierName: courierName,
      // Other relevant data for CourierLog object
    };

    try {
      const response = await axios.post(
        `http://localhost:8085/courierlogs/addcourierlog/${residentId}/${gatekeeperId}`,
        courierLogData
      );
      console.log('Added Courier log:', response.data);
      // Reset form fields after successful submission
      setResidentId('');
      setGatekeeperId('');
      setEntryTime('');
      setExitTime('');
      setCourierName('');
    } catch (error) {
      //console.error('Error adding Courier log:', error);
    }
  };
  const handleResidentChange = (e) => {
    setResidentId(e.target.value);
  };
  
  const handleGatekeeperChange = (e) => {
    setGatekeeperId(e.target.value);
  };
  
  const handleEntryTimeChange = (e) => {
    setEntryTime(e.target.value);
  };
  
  const handleExitTimeChange = (e) => {
    setExitTime(e.target.value);
  };
  
  
  const handleCourierNameChange = (e) => {
    setCourierName(e.target.value);
  };
  
  return (
    <div className="container-sm mt-4">
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div className="card ">
            <div className="card-body p-2">
              <h5 className="card-title text-center mb-4">Add CourierLogs</h5>
              <form onSubmit={handleFormSubmit}>
              <div className="row mb-3">
    <div className="col-md-6 ">
      <label htmlFor="residentId" className="form-label">Resident Id</label>
      <select className="form-select" value={residentId} onChange={handleResidentChange}>
        <option value="">Select Resident</option>
        {residents.map((resident) => (
          <option key={resident.id} value={resident.id}>{resident.name}</option>
        ))}
      </select>
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6 ">
      <label htmlFor="gatekeeperId" className="form-label">Gatekeeper Id</label>
      <select className="form-select" value={gatekeeperId} onChange={handleGatekeeperChange}>
        <option value="">Select Gatekeeper</option>
        {gatekeepers.map((gatekeeper) => (
          <option key={gatekeeper.id} value={gatekeeper.id}>{gatekeeper.id}</option>
        ))}
      </select>
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6">
      <label htmlFor="visitorname" className="form-label">Courier Name</label>
      <input
        type="name"
        className="name"
        id="name"
        name="name"
        value={courierName}
        onChange={handleCourierNameChange}
      />
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6">
      <label htmlFor="entrytime" className="form-label">Entry Time</label>
      <input
        type="time"
        className="form-control"
        id="entrytime"
        name="entrytime"
        value={entryTime}
        onChange={handleEntryTimeChange}
      />
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6">
      <label htmlFor="exittime" className="form-label">Exit Time</label>
      <input
        type="time"
        className="form-control"
        id="exittime"
        name="exittime"
        value={exitTime}
        onChange={handleExitTimeChange}
      />
    </div>
  </div>        <button type="submit" className="btn btn-primary" >Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourierLogs;
