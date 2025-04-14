import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/characters')
      .then(response => {
        setCharacters(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(`Failed to fetch characters: ${error.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <h3>Loading Heroes...</h3>
        <Spinner animation="border" variant="info" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h3>Error</h3>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        {characters.map((character) => (
          <Col key={character.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={character.image_url}
                alt={character.name}
                style={{ height: "auto", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                  <strong>ID:</strong> {character.id} <br /> 
                  <strong>Alias:</strong> {character.alias} <br />
                  <strong>Alignment:</strong> {character.alignment}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => navigate(`/characters/${character.id}`)} 
                >
                    View Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Characters;