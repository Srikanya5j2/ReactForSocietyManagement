import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import './event.css'; // Import your CSS file for additional styling

function EventComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8085/events/getallEvents")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching notices:", error));
  }, []);

  return (
    <Container fluid>
      <Row className="event-row">
        {events.map((event, index) => (
          <Col key={index} className="mb-4">
            <Card className="event-card">
              <Card.Body>
                <Card.Title>{event.content}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {event.date}<br />
                  <strong>Location:</strong> {event.location}<br />
                  <strong>Participants:</strong> {event.participants}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EventComponent;
