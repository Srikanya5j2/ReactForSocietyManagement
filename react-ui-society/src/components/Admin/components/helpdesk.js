import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function HelpDeskComponent() {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(5); // Set the number of tickets per page
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8085/helpdesk/allTickets')
      .then(response => setTickets(response.data))
      .catch(error => console.error('Error fetching Tickets:', error));
  }, []);

  // Calculate current tickets for the current page
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReply = (ticketId) => {
    console.log('Admin replying to ticket ID:', ticketId);
    // window.location.href = `/reply/${ticketId}`;
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
            {currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.resident.name}</td>
                <td>{ticket.resident.user.flatNo}</td>
                <td>{ticket.name}</td>
                <td>{ticket.date}</td>
                <td>{ticket.description}</td>
                <td>{ticket.status}</td>
                <td>
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
      <ul className="pagination justify-content-center">
        {Array.from({ length: Math.ceil(tickets.length / ticketsPerPage) }, (_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HelpDeskComponent;
