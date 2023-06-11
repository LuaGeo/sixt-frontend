// Modal opened when offer clicked in OfferList's page

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { SplashImages } from "./SplashImages";
import { calculateTotalPrice } from "../utils/calculateTotalPrice";

export const Modal = ({
  setVisibleModal,
  visibleModal,
  offer,
  pickupDate,
  returnDate,
  pickupStation,
  searchTerm,
}) => {
  const totalPrice = calculateTotalPrice({ offer, pickupDate, returnDate });

  const {
    maxPassengers,
    doors,
    automatic,
    baggage,
    airCondition,
    driverMinAge,
  } = offer.carGroupInfo;

  const [rentDetails, setRentDetails] = useState();
  const [isLoading, setIsLoading] = useState();
  const [extraFees, setExtraFees] = useState([]);

  useEffect(() => {
    const fetchRentDetails = async () => {
      try {
        const payload = { offerId: offer.id };
        const response = await axios.post(
          "https://site--sixt-backend--6v4khcscf8qp.code.run/rentalconfigurations/create",
          payload
        );
        setRentDetails(response.data);
        setIsLoading(false);
        const extraFees = response.data.extraFees.map(
          (extraFee) => extraFee.price.amount
        );
        setExtraFees(extraFees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentDetails();
  }, []);

  const splashImages = rentDetails?.splashImages;

  const totalExtraFees = extraFees.reduce((acc, value) => {
    return acc + value;
  }, 0);

  const totalPriceWithTax = Number(totalPrice) + Number(totalExtraFees);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div
      className="modalContainer"
      onClick={() => {
        setVisibleModal(false);
      }}
    >
      <div
        className="modalInfosContainer"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {splashImages ? (
          <SplashImages splashImages={splashImages} />
        ) : (
          <img src={offer.images.large} alt="" />
        )}
        <h1 className="modalTitle">{offer.headlines.longSubline}</h1>

        <div className="spanContainer">
          <span className="ico-maxPassengers"> {maxPassengers} Sièges</span>
          <span className="ico-doors"> {doors} Portes</span>
          <span className="ico-automatic">
            {automatic ? "Automatique" : "Manuel"}
          </span>
          <span className="ico-baggage">{baggage} Bagages</span>
          <span className="ico-airCondition">
            {airCondition ? "Climatisation" : "Pas de climatisation"}
          </span>
          <span className="ico-driverRequirements">{driverMinAge} Ans</span>
        </div>

        <div className="modalInfosSelect">
          <button
            onClick={() => {
              setVisibleModal(!visibleModal);
            }}
          >
            X
          </button>
          <div>
            <div>
              <h1>TOTAL</h1>
              <h1>€ {totalPriceWithTax.toFixed(2)}</h1>
            </div>
            <div className="taxesIncluses">
              <p>(Taxes incluses)</p>
            </div>
            <Link
              to={"/offerconfig"}
              state={{
                offer,
                rentDetails,
                pickupDate,
                returnDate,
                pickupStation,
                searchTerm,
              }}
            >
              <button>SÉLECTIONNER</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
