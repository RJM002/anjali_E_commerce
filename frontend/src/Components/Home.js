import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import HomeCarousel from "./Carousel";
import "./home.css"; // Add your custom CSS here

function Home({ isAuthenticated, setIsAuthenticated, product }) {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  return (
    <>
      <HomeCarousel />
      <Container className="mt-4">
        <h2 className="text-center mb-4">Our Products</h2>
        <Row>
          {product.map(item => (
            <Col key={item.id} md={4} className="mb-4">
              <Card className="productCard shadow-sm">
                <Card.Img variant="top" src='https://via.placeholder.com/150' />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.description}<br />
                    <strong>{item.price}</strong>
                  </Card.Text>
                  {/* Uncomment if you want to add a button */}
                  {/* <Button variant="primary">Add to Cart</Button> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Home;
