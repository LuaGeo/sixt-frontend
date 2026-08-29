import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { RentOffersCards } from "../components/RentOffersCards";
import { LocationSearch } from "../components/LocationSearch";
import { Modal } from "../components/Modal";
import { API_URL } from "../config";

export const OfferList = () => {
  const location = useLocation();

  // Valeurs par défaut si on arrive sur /offerlist sans passer par la recherche
  // (lien direct, rafraîchissement de la page).
  const iso = (d) => d.toISOString().split("T")[0];
  const inDays = (n) => iso(new Date(Date.now() + n * 86400000));
  const state = location.state || {};
  const {
    pickupStation = "",
    returnStation = "",
    pickupDate = inDays(0),
    returnDate = inDays(3),
    searchTerm,
  } = state;

  const [offersList, setOffersList] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/rentaloffers?pickupStation=${pickupStation}&returnStation=${returnStation}&pickupDate=${pickupDate}&returnDate=${returnDate}`,
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
        setVisibleModal={setVisibleModal}
        onSelectOffer={setSelectedOffer}
      />
      {visibleModal && selectedOffer && (
        <Modal
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          offer={selectedOffer}
          pickupDate={pickupDate}
          returnDate={returnDate}
          pickupStation={pickupStation}
          searchTerm={searchTerm}
        />
      )}
    </>
  );
};
