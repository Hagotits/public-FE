import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImageSlider = ({ images = [] }) => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
      {images.map((image) => (
        <div key={image}>
          <img src={`http://localhost:4000/${image}`} alt={image} />
        </div>
      ))}
      <div></div>
    </Carousel>
  );
};

export default ImageSlider;
