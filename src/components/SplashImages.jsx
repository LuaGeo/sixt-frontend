// Component used in Modal.jsx to do a map of splashImages (from rentDetails) and showing all the images found in a carousel using a carousel package

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const SplashImages = ({ splashImages }) => {
  return (
    <div className="modalCarouselContainer">
      <Carousel showStatus={false} showThumbs={false} emulateTouch={true}>
        {splashImages.map((image, index) => (
          <div className="modalImgContainer" key={index}>
            <img src={image} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
