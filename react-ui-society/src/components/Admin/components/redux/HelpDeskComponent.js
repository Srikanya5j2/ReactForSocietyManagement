import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setTickets } from '../../../../store/actions/ticketsActions';
//import { setTickets } from 'src/store/actions/ticketsActions';

function HelpDeskComponent() {
  const tickets = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8085/helpdesk/allTickets')
      .then(response => {
        dispatch(setTickets(response.data));
      })
      .catch(error => console.error('Error fetching Tickets:', error));
  }, [dispatch]);

  const handleReply = (ticketId) => {
    console.log('Admin replying to ticket ID:', ticketId);
   
  };

  return (
    <div className="container mt-4">
      <h2>Help Desk Tickets</h2>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Resident Name</th>
              <th>FlatNo</th>
              <th>Name</th>
              <th>Date</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.resident.name}</td>
                <td>{ticket.resident.user.flatNo}</td>
                <td>{ticket.name}</td>
                <td>{ticket.date}</td>
                <td>{ticket.description}</td>
                <td>{ticket.status}</td>
                <td>
                  {/* Button for admin reply */}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleReply(ticket.id)}
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HelpDeskComponent;
