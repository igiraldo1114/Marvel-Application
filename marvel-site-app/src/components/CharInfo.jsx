import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

function CharInfo() {
  const { id } = useParams(); 
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/characters/${id}`) 
      .then(response => {
        setCharacter(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(`Failed to fetch character: ${error.message}`);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <h3>Loading Hero Info...</h3>
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
      <Card>
        <Card.Img
          variant="top"
          src={character.image_url}
          alt={character.name}
          style={{
            width: '300px', 
            height: 'auto', 
            objectFit: 'cover', 
            margin: '0 auto', 
          }}

        />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>
            <strong>Alias:</strong> {character.alias} <br />
            <strong>Alignment:</strong> {character.alignment} <br />
            <strong>Powers:</strong> {character.powers}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CharInfo;