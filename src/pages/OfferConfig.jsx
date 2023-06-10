import { Header } from "../components/Header";
import { LocationSearch } from "../components/LocationSearch";
import { useLocation, Link } from "react-router-dom";

import { useState } from "react";

import { AdditionalChargesCard } from "../components/AdditionalChargesCard";
import { calculateTotalPrice } from "../utils/calculateTotalPrice";
import { PriceDetailsModal } from "../components/PriceDetailsModal";

export const OfferConfig = () => {
  const [showAllCharges, setShowAllCharges] = useState(false);
  const [selectedAdditionalCharges, setSelectedAdditionalCharges] = useState(
    []
  );
  const [visiblePriceDetailsModal, setVisiblePriceDetailsModal] =
    useState(false);

  const location = useLocation();

  const {
    offer,
    rentDetails,
    pickupDate,
    returnDate,
    pickupStation,
    searchTerm,
  } = location.state || {};

  const showLessCharges = rentDetails.additionalCharges.slice(0, 5);

  const totalPrice = calculateTotalPrice({
    offer,
    pickupDate,
    returnDate,
    additionalChargePrices: selectedAdditionalCharges.map(
      (selectedAdditionalCharge) => selectedAdditionalCharge.dayPrice
    ),
    extraFees: rentDetails.extraFees.map((extraFee) => extraFee.price.amount),
  });

  const {
    maxPassengers,
    doors,
    automatic,
    baggage,
    airCondition,
    driverMinAge,
  } = offer.carGroupInfo;

  function handleActiveChange({ id, dayPrice, title }) {
    const newAdditionalCharge = { id, dayPrice, title };
    const findAdditionalCharge = selectedAdditionalCharges.find(
      (selectedAdditionalCharge) => selectedAdditionalCharge.id === id
    );
    if (findAdditionalCharge) {
      setSelectedAdditionalCharges(
        selectedAdditionalCharges.filter(
          (selectedAdditionalCharge) => selectedAdditionalCharge.id !== id
        )
      );
    } else {
      setSelectedAdditionalCharges([
        ...selectedAdditionalCharges,
        newAdditionalCharge,
      ]);
    }
  }

  return (
    <>
      <Header currentPage={"OfferConfig"} />
      <LocationSearch />
      <div className="offerConfigHero">
        <h1>{offer.headlines.description.toUpperCase()}</h1>
        <img src={rentDetails.splashImages[0]} alt="" />
      </div>
      <div className="offerConfigHeroDetails">
        <h2>{offer.headlines.longSubline.toUpperCase()}</h2>
        <div>
          <span className="ico-maxPassengers">{maxPassengers} Sièges</span>
          <span className="ico-doors">{doors} Portes</span>
          <span className="ico-automatic">
            {automatic ? "Automatique" : "Manuel"}
          </span>
          <span className="ico-baggage">{baggage} Bagages</span>
          <span className="ico-airCondition">
            {airCondition ? "Climatisation" : "Pas de climatisation"}
          </span>
          <span className="ico-driverRequirements">{driverMinAge} Ans</span>
        </div>
      </div>
      <main>
        <div className="offerConfigContainer">
          <div className="leftColumn">
            <h1>CHOISISSEZ VOTRE PROTECTION ET VOS OPTIONS</h1>
            <h3>VOTRE OFFRE INCLUT :</h3>

            <ul className="includedOffersList">
              {[
                ...rentDetails.includedCharges,
                ...selectedAdditionalCharges,
              ].map((charge, index) => (
                <div key={index}>
                  <li className="ico-bullet-sm">{charge.title}</li>
                </div>
              ))}
            </ul>

            <h3>CHOISISSEZ VOS OPTIONS SUPPLÉMENTAIRES :</h3>
            <div className="additionalChargesContainer">
              {showAllCharges
                ? rentDetails.additionalCharges.map((charge) => (
                    <AdditionalChargesCard
                      key={charge.id}
                      charge={charge}
                      isActive={selectedAdditionalCharges.find(
                        (selectedAdditionalCharge) =>
                          selectedAdditionalCharge.id === charge.id
                      )}
                      onActiveChange={() =>
                        handleActiveChange({
                          id: charge.id,
                          dayPrice: charge.price.amount,
                          title: charge.title,
                        })
                      }
                    />
                  ))
                : showLessCharges.map((charge) => (
                    <AdditionalChargesCard
                      key={charge.id}
                      charge={charge}
                      isActive={selectedAdditionalCharges.find(
                        (selectedAdditionalCharge) =>
                          selectedAdditionalCharge.id === charge.id
                      )}
                      onActiveChange={() =>
                        handleActiveChange({
                          id: charge.id,
                          dayPrice: charge.price.amount,
                          title: charge.title,
                        })
                      }
                    />
                  ))}

              {showAllCharges ? (
                <button
                  onClick={() => {
                    setShowAllCharges(false);
                  }}
                >
                  <span className="ico-minus-sign"></span> VOIR MOINS D'OPTIONS
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAllCharges(true);
                  }}
                >
                  <span className="ico-plus-sign"></span> VOIR PLUS D'OPTIONS
                </button>
              )}
            </div>
          </div>
          <div className="rightColumn">
            <div>
              <div>
                <h3>TOTAL</h3>
                <button
                  className="ico-chevron-right"
                  onClick={() => {
                    setVisiblePriceDetailsModal(!visiblePriceDetailsModal);
                  }}
                >
                  {" "}
                  Détails du prix
                </button>
              </div>
              <div>
                <h1>€ {totalPrice}</h1>
                <p>Taxes incluses</p>
              </div>
            </div>
            <Link
              to={"/personnaldetails"}
              state={{
                offer,
                rentDetails,
                pickupDate,
                returnDate,
                totalPrice,
                selectedAdditionalCharges,
                pickupStation,
                searchTerm,
              }}
            >
              <button>CONTINUER</button>
            </Link>
          </div>
        </div>
      </main>
      {visiblePriceDetailsModal && (
        <PriceDetailsModal
          visiblePriceDetailsModal={visiblePriceDetailsModal}
          setVisiblePriceDetailsModal={setVisiblePriceDetailsModal}
          rentDetails={rentDetails}
          pickupDate={pickupDate}
          returnDate={returnDate}
          totalPrice={totalPrice}
          offer={offer}
          selectedAdditionalCharges={selectedAdditionalCharges}
        />
      )}
    </>
  );
};
