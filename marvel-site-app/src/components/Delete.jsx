import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const DeleteCharacter = () => {
  const [characterId, setCharacterId] = useState(""); 
  const [character, setCharacter] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSearch = (e) => {
    e.preventDefault();

    if (!characterId) {
      setErrorMessage("Please enter a Hero ID."); 
      setSuccessMessage(""); 
      setCharacter(null); 
      return;
    }
    axios
      .get(`http://127.0.0.1:5000/characters/${characterId}`)
      .then((response) => {
        if (!response.data || Object.keys(response.data).length === 0) {
          setErrorMessage("No heroes with the provided ID.");
          setSuccessMessage("");
          setCharacter(null);
        } else {
          setCharacter(response.data);
          setErrorMessage("");
          setSuccessMessage("");
        }
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.error || "An error occurred while searching for your hero."
        );
        setSuccessMessage(""); 
        setCharacter(null);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (!characterId) {
      setErrorMessage("Please enter a hero ID."); 
      setSuccessMessage("");
      return;
    }

    axios
      .delete(`http://127.0.0.1:5000/characters/${characterId}`)
      .then((response) => {
        setSuccessMessage(response.data.message || "hero deleted successfully!");
        setErrorMessage(""); 
        setCharacter(null);
        setCharacterId(""); 
      })
      .catch((error) => {
        // Handle backend errors
        setErrorMessage(
          error.response?.data?.error || "An error occurred while deleting the hero."
        );
        setSuccessMessage("");
      });
  };

  return (
    <Container className="mt-4">
      <h2>Search and Delete a Hero</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3">
          <Form.Label>Hero ID</Form.Label>
          <Form.Control
            type="text"
            value={characterId}
            onChange={(e) => setCharacterId(e.target.value)} 
            placeholder="Enter the ID of the hero to search"
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Search
        </Button>
      </Form>

      {character && (
        <Card className="mt-4">
          <Card.Img
            variant="top"
            src={character.image_url}
            alt={character.name}
            style={{
              width: "300px",
              height: "auto",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
          <Card.Body>
            <Card.Title>{character.name}</Card.Title>
            <Card.Text>
              <strong>Alias:</strong> {character.alias} <br />
              <strong>Alignment:</strong> {character.alignment} <br />
              <strong>Powers:</strong> {character.powers}
            </Card.Text>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default DeleteCharacter;