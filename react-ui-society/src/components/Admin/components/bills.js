import React from 'react';
import { useNavigate } from 'react-router';


const BillComponent = () => {
  
  const navigate = useNavigate();
  return (
    <div>
   
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
      <label className="btn btn-outline-primary" htmlFor="btnradio1" onClick={() => navigate('/postbills')}>Post Bills</label>
  
      <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
      <label className="btn btn-outline-primary" htmlFor="btnradio2" onClick={() => navigate('/getbills')}>Get Bills</label>
  
      <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
      <label className="btn btn-outline-primary" htmlFor="btnradio3" onClick={() => navigate('/pendingbills')}>PendingBills</label>
    </div>
    </div>
  );
};

export default BillComponent;
