import React, { useState } from 'react';
import axios from 'axios';

const AddEvent= () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    location: ''
   
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8085/events/addEvents', eventData);
      console.log('Event added successfully:', response.data);
      setEventData({ eventName: '', eventDate: '', location: '' }); // Reset form fields upon successful addition
    } catch (error) {
      console.error('Error adding event:', error.response?.data || 'Something went wrong');
      // Handle error or show an error message to the user
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Events</h2>
              <form onSubmit={handleSubmit}>
                <table className="table">
                  <tbody>
                    <tr>
                      <td><label htmlFor="eventName">Event Name:</label></td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="eventName"
                          value={eventData.eventName}
                          onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="eventDate">Event Date:</label></td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          id="eventDate"
                          value={eventData.eventDate}
                          onChange={(e) => setEventData({ ...eventData, eventDate: e.target.value })}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="location">Location:</label></td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          value={eventData.location}
                          onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                          required
                        />
                      </td>
                    </tr>
                  {/*  <tr>
                      <td><label htmlFor="participants">Participants:</label></td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="participants"
                          value={eventData.participants}
                          onChange={(e) => setEventData({ ...eventData, participants: e.target.value })}
                          required
                        />
                      </td>
  </tr>*/}
                  </tbody>
                </table>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Add Event</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
