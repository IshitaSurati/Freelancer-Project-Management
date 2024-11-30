import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Dashboard = ({ projects }) => {
  return (
    <div className="my-5">
      <h3 className="mb-4">Projects Overview</h3>
      <Row>
        {projects.map((project) => (
          <Col sm={12} md={4} key={project._id}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>
                  <strong>Due Date:</strong> {project.dueDate}
                  <br />
                  <strong>Status:</strong> {project.status}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
