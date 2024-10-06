import React from 'react';
import { Carousel } from 'react-bootstrap';
const Image= require('../assets/carusal1.png')

const HomeCarousel = () => {
  const images = [
    Image,
    Image,
    Image
  ];

  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;