import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const UpdateCharacter = () => {
  const [characterId, setCharacterId] = useState(""); 
  const [character, setCharacter] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    alignment: "",
    powers: "",
    image_url: "",
  }); 

  const handleSearch = (e) => {
    e.preventDefault();

    if (!characterId) {
      setErrorMessage("Please enter a character ID.");
      setSuccessMessage("");
      return;
    }

    axios
      .get(`http://127.0.0.1:5000/characters/${characterId}`)
      .then((response) => {
        setCharacter(response.data); 
        setFormData(response.data); 
        setErrorMessage("");
        setSuccessMessage("");
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.error || "Character not found."
        );
        setSuccessMessage("");
        setCharacter(null);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData,
     [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://127.0.0.1:5000/characters/${characterId}`, formData)
      .then((response) => {
        setSuccessMessage(response.data.message || "Character updated successfully!");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.error || "Failed to update character."
        );
        setSuccessMessage("");
      });
  };

  return (
    <Container className="mt-4">
      <h2>Search and Update a Hero</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Search Form */}
      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3">
          <Form.Label>Hero ID</Form.Label>
          <Form.Control
            type="text"
            value={characterId}
            onChange={(e) => setCharacterId(e.target.value)}
            placeholder="Enter the ID of the character to search"
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Search
        </Button>
      </Form>

      {character && (
        <Form className="mt-4" onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Alias</Form.Label>
            <Form.Control
              type="text"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Alignment</Form.Label>
            <Form.Select
              name="alignment"
              value={formData.alignment}
              onChange={handleChange}
            >
              <option value="hero">Hero</option>
              <option value="villain">Villain</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Powers</Form.Label>
            <Form.Control
              as="textarea"
              name="powers"
              value={formData.powers}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Update
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default UpdateCharacter;