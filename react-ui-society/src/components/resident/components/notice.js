import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import './notice.css';

class NoticeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notices: []
    };
  }

  componentDidMount() {
    // Fetch all notices from the API
    axios.get("http://localhost:8085/notices/getallNotices")
      .then(response => this.setState({ notices: response.data }))
      .catch(error => console.error("Error fetching notices:", error));
  }

  render() {
    const { notices } = this.state;

    return (
      <div className="notice-container">
        <Container fluid>
          <Row className="notice-row">
            {notices.map((notice, index) => (
              <Col key={index} className="mb-4">
                <Card className="notice-card">
                  <Card.Body>
                    <Card.Title>{notice.title}</Card.Title>
                    <Card.Text>
                      <strong>Content:</strong> {notice.content}<br />
                      <strong>Date:</strong> {notice.date}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}


export default NoticeComponent;
