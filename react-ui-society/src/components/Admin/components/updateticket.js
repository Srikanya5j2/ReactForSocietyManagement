import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";


const UpdateTicket = ({ ticketId, updatedTicketData }) => {
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({}); // State for the edited ticket

  // Function to fetch tickets
  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:8085/helpdesk/allTickets'); // Replace with your API endpoint
      setTickets(response.data); // Set fetched tickets
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    fetchTickets(); // Fetch tickets when component mounts or ticketId/updatedTicketData changes
  }, [ticketId, updatedTicketData]);

  const handleEditClick = (ticket) => {
    setTicket(ticket); // Set the ticket to be edited when the "Reply" button is clicked
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket({
      ...ticket,
      [name]: value,
    });
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`http://localhost:8085/helpdesk/updateTicket/${ticket.id}`, ticket);
     fetchTickets(); // Fetch updated tickets after successful update
      setTicket({}); // Reset edited ticket state after update
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };


  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ResidentName</th>
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
               <td>{ticket.resident.user.name}</td>
              <td>{ticket.resident.user.flatNo}</td>
              <td>{ticket.name}</td>
              <td>{ticket.date}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditClick(ticket)}
                >
                  Reply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
          </table>

      {ticket.id && (
  <div className="card mt-4">
    <div className="card-header bg-primary text-white">
      Edit Ticket
    </div>
    <div className="d-flex justify-content-center mt-4">
  <Card className="w-50">
    <div className="card-body">
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          name="date"
          value={ticket.date}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={ticket.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          className="form-control"
          id="status"
          name="status"
          value={ticket.status}
          onChange={handleInputChange}
        >
          <option value="Active">ACTIVE</option>
          <option value="Closed">CLOSED</option>
        </select>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleUpdateClick}
      >
        UpdateTicket
      </button>
    </div>
    </Card>
    </div>
  </div>
)}
    </div>
  );
}

export default UpdateTicket;
