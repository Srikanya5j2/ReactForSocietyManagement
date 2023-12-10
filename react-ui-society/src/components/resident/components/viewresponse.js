import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './navbar';

const GetTicket = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTicketsData = async () => {
      try {
        const userId = localStorage.getItem('id');
        const residentIdResponse = await axios.get(`http://localhost:8085/resident/getResidentIdByUserId/${userId}`);

        const residentId = residentIdResponse.data;

        if (residentId) {
          const TicketsResponse = await axios.get(`http://localhost:8085/helpdesk/getticketsbyresidentId/${residentId}`);
          setTickets(TicketsResponse.data);
        } else {
          console.error('No residentId found in response');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchTicketsData();
  }, []);

  return (
    <div>
        <UserNavbar/>
    <div className="container mt-4">
      <h2>Help Desk Tickets</h2>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
             
              <th>Resident Name</th>
              <th>FlatNo</th>
              <th>Name</th>
              <th>Date</th>
              <th>Description</th>
              <th>Status</th>
            
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
               
                <td>{ticket.resident.name}</td>
                <td>{ticket.resident.user.flatNo}</td>
                <td>{ticket.name}</td>
                <td>{ticket.date}</td>
                <td>{ticket.description}</td>
                <td>{ticket.status}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}


export default GetTicket;
