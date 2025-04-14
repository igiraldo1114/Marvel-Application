import { useState } from "react";
import { Container, Carousel, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css"; 

const HomePage = () => {
  const [heroes, setHeroes] = useState([]);

  const fetchRandomHeroes = () => {
    const predefinedHeroes = [
      {
        id: 1,
        name: "Spider-Man",
        alias: "Peter Parker",
        alignment: "Hero",
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
      },
      {
        id: 2,
        name: "Loki",
        alias: "God of Mischief",
        alignment: "Villain",
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Various_incarnations_of_Loki_%282014%29.webp/256px-Various_incarnations_of_Loki_%282014%29.webp.png",
      },
      {
        id: 3,
        name: "Hulk",
        alias: "Bruce Banner",
        alignment: "Hero",
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Hulk_%28circa_2019%29.png/220px-Hulk_%28circa_2019%29.png",
      },
      {
        id: 4,
        name: "Thanos",
        alias: "The Mad Titan",
        alignment: "Villain",
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Thanos_Infinity_4.png/220px-Thanos_Infinity_4.png",
      },
    ];

    setHeroes(predefinedHeroes);
  };

  return (
    <Container fluid className="homepage-container">
      <h1 className="text-center pt-5">Marvel Universe</h1>
      <Container className="mt-4">
        <Row className="text-center mb-4">
          <Col>
            <p className="black-text">
              Welcome to the Marvel Universe! Discover and create your favorite heroes or
              villains.
            </p>
            <Button variant="danger" onClick={fetchRandomHeroes}>
              Load Heroes
            </Button>
          </Col>
        </Row>

        <Row className="w-100">
          <Col>
            {heroes.length > 0 && (
              <Carousel className="d-flex justify-content-center">
                {heroes.map((hero) => (
                  <Carousel.Item key={hero.id} className="text-center">
                    <img
                      className="d-block mx-auto"
                      src={hero.image_url}
                      alt={hero.name}
                      style={{
                        width: "300px", 
                        height: "500px", 
                        objectFit: "cover", 
                        borderRadius: "10px", 
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x400?text=Image+Not+Available";
                      }}
                    />
                    <Carousel.Caption
                      style={{
                        position: "static",
                        marginTop: "10px",
                      }}
                    >
                      <h3>{hero.name}</h3>
                      <p>{hero.alias}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
