import carousel1 from "../assets/imgs/carousel1.jpeg";
import carousel2 from "../assets/imgs/carousel2.jpeg";
import carousel3 from "../assets/imgs/carousel3.jpeg";
import worldMap from "../assets/imgs/sixt-in-the-world.png";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { LocationSearch } from "../components/LocationSearch";
import { Header } from "../components/Header";

export const Home = () => {
  return (
    <>
      <Header currentPage={"Home"} />
      <LocationSearch currentPage={"Home"} />
      <main>
        <Carousel
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          emulateTouch={true}
          showStatus={false}
          showThumbs={false}
        >
          <div>
            <img src={carousel1} alt="img" />
          </div>
          <div>
            <img src={carousel2} alt="img" />
          </div>
          <div>
            <img src={carousel3} alt="img" />
          </div>
        </Carousel>
        <section className="worldMapBlock">
          <h1>LES AGENCES SIXT DANS LE MONDE</h1>
          <div>
            <img
              src={worldMap}
              alt="Carte avec le nombre d'agences Sixt dans le monde et un button pour trouver une agence"
            />
            <button>TROUVER L'AGENCE</button>
          </div>
        </section>
        <section className="downloadsBlock">
          <h2>TÉLÉCHARGEZ L'APP SIXT</h2>
          <div className="buttons">
            <button>
              <span className="ico-apple-logo"></span>
            </button>
            <button>
              <span className="ico-google-logo"></span>
            </button>
          </div>
          <h2>SUIVEZ-NOUS</h2>
          <div className="socialMedia">
            <span className="ico-fb-logo"></span>
            <span className="ico-twitter-logo"></span>
            <span className="ico-instagram-logo"></span>
            <span className="ico-youtube-logo"></span>
          </div>
        </section>
      </main>
    </>
  );
};
