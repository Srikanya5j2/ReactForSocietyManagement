import axios from 'axios';
import { useEffect, useState } from 'react';
import GatekeeperNavbar from './navbar';

function Visitorentry() {
  const [residentId, setResidentId] = useState('');
  const [gatekeeperId, setGatekeeperId] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [visitorContact, setVisitorContact] = useState('');
  const [visitorName, setVisitorName]=useState('');
  const [residents, setResidents] = useState([]);
  const [gatekeepers, setGatekeepers] = useState([]);

  const fetchResidents = async () => {
    try {
      const response = await axios.get('http://localhost:8085/resident/all');
      setResidents(response.data);
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  const fetchGatekeepers = async () => {
    try {
      const response = await axios.get('http://localhost:8085/gatekeeper/all');
      setGatekeepers(response.data);
    } catch (error) {
      console.error('Error fetching gatekeepers:', error);
    }
  };

  useEffect(() => {
    fetchResidents();
    fetchGatekeepers();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const visitorLogData = {
      residentId: parseInt(residentId),
      gatekeeperId: parseInt(gatekeeperId),
      entryTime: entryTime,
      exitTime: exitTime,
      visitorContact: visitorContact,
      visitorName:visitorName
    };

    try {
      const response = await axios.post(
        `http://localhost:8085/visitorLogs/entry`,
        visitorLogData
      );
      console.log('Added visitor log:', response.data);
      // Reset form fields after successful submission
      setResidentId('');
      setGatekeeperId('');
      setEntryTime('');
      setExitTime('');
      setVisitorContact('');
    } catch (error) {
      console.error('Error adding visitor log:', error);
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
  
  const handleVisitorContactChange = (e) => {
    setVisitorContact(e.target.value);
  };
  const handleVisitorNameChange = (e) => {
    setVisitorName(e.target.value);
  };
  
  return (
    <div>
      
   
    <div className="container-sm mt-4">
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div className="card ">
            <div className="card-body p-2">
              <h5 className="card-title text-center mb-4">Add VisitorLogs</h5>
              <form onSubmit={handleFormSubmit}>
              <div className="col-md-6">
      <label htmlFor="residentInput" className="form-label">
        Resident:
      </label>
      <input
        type="text"
        list="residentOptions"
        className="form-select"
        id="residentInput"
        value={residentId}
        onChange={(e) => setResidentId(e.target.value)}
        placeholder="Select Resident"
      />
      <datalist id="residentOptions">
        {residents
          .filter((resident) =>
            resident.name.toLowerCase().includes(residentId.toLowerCase())
          )
          .map((resident) => (
            <option key={resident.id} value={resident.name} />
          ))}
      </datalist>
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
      <label htmlFor="entrytime" className="form-label">Entry Time</label>
      <input
        type="datetime-local"
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
        type="datetime-local"
        className="form-control"
        id="exittime"
        name="exittime"
        value={exitTime}
        onChange={handleExitTimeChange}
      />
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6">
      <label htmlFor="visitorcontact" className="form-label">Visitor Contact</label>
      <input
        type="contact"
        className="contact"
        id="contact"
        name="contact"
        value={visitorContact}
        onChange={handleVisitorContactChange}
      />
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6">
      <label htmlFor="visitorname" className="form-label">Visitor Nmae</label>
      <input
        type="name"
        className="name"
        id="name"
        name="name"
        value={visitorName}
        onChange={handleVisitorNameChange}
      />
    </div>
  </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Visitorentry;
