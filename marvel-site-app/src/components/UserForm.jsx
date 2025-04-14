import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    alignment: "",
    powers: "",
    image_url: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [validationErrors, setValidationErrors] = useState({}); 
  const [addedCharacter, setAddedCharacter] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, 
    [name]: value });
    setValidationErrors({ ...validationErrors, 
    [name]: "" }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.alias) errors.alias = "Alias is required.";
    if (!formData.alignment) errors.alignment = "Alignment is required.";
    if (!formData.powers) errors.powers = "Powers are required.";
    if (!formData.image_url) errors.image_url = "Image URL is required.";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); 
      return; 
    }

   
    axios
      .post("http://127.0.0.1:5000/characters", formData)
      .then((response) => {
        setSuccessMessage(response.data.message || "hero added successfully!"); 
        setErrorMessage(""); 
        setAddedCharacter(formData); 
        setFormData({
          name: "",
          alias: "",
          alignment: "",
          powers: "",
          image_url: "",
        }); 
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.error || "Failed to add hero."
        ); 
        setSuccessMessage(""); 
      });
  };

  return (
    <Container className="mt-4">
      <h2>Add a New hero</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!validationErrors.name} 
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            isInvalid={!!validationErrors.alias}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.alias}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Alignment</Form.Label>
          <Form.Select
            name="alignment"
            value={formData.alignment}
            onChange={handleChange}
            isInvalid={!!validationErrors.alignment}
          >
            <option value="">Select Alignment</option>
            <option value="hero">Hero</option>
            <option value="villain">Villain</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {validationErrors.alignment}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Powers</Form.Label>
          <Form.Control
            as="textarea"
            name="powers"
            value={formData.powers}
            onChange={handleChange}
            isInvalid={!!validationErrors.powers}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.powers}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            isInvalid={!!validationErrors.image_url}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.image_url}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="danger" type="submit">
          Submit
        </Button>
      </Form>

      {addedCharacter && (
        <Card className="mt-4">
          <Card.Img
            variant="top"
            src={addedCharacter.image_url}
            alt={addedCharacter.name}
            style={{
              width: "300px",
              height: "400px",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
          <Card.Body>
            <Card.Title>{addedCharacter.name}</Card.Title>
            <Card.Text>
              <strong>Alias:</strong> {addedCharacter.alias} <br />
              <strong>Alignment:</strong> {addedCharacter.alignment} <br />
              <strong>Powers:</strong> {addedCharacter.powers}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default UserForm;