import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { RentOffersCards } from "../components/RentOffersCards";
import { LocationSearch } from "../components/LocationSearch";
import { Modal } from "../components/Modal";

export const OfferList = () => {
  const location = useLocation();

  const {
    pickupStation,
    returnStation,
    pickupDate,
    returnDate,
    offer,
    searchTerm,
  } = location.state || {};

  const [offersList, setOffersList] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `https://site--sixt-backend--6v4khcscf8qp.code.run/rentaloffers?pickupStation=${pickupStation}&returnStation=${returnStation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
        );
        setOffersList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOffers();
  }, []);

  return (
    <>
      <Header currentPage={"OfferList"} />
      <LocationSearch />

      <RentOffersCards
        offersList={offersList}
        pickupDate={pickupDate}
        returnDate={returnDate}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
      />
      {visibleModal && (
        <Modal
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          offer={offer}
          pickupDate={pickupDate}
          returnDate={returnDate}
          pickupStation={pickupStation}
          searchTerm={searchTerm}
        />
      )}
    </>
  );
};
