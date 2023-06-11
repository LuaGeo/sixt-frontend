// Modal that appears when click on "Détails du prix" in OfferConfig's page

import { differenceInDays } from "date-fns";

export const PriceDetailsModal = ({
  visiblePriceDetailsModal,
  setVisiblePriceDetailsModal,
  rentDetails,
  pickupDate,
  returnDate,
  totalPrice,
  offer,
  selectedAdditionalCharges,
  extraFees,
}) => {
  const rentalDurationInDays = differenceInDays(
    new Date(returnDate),
    new Date(pickupDate)
  );

  return (
    <div
      className="priceDetailsModalContainer"
      onClick={() => {
        setVisiblePriceDetailsModal(!visiblePriceDetailsModal);
      }}
    >
      <div
        className="priceDetailsModalInfosContainer"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="buttonContainer">
          <button
            onClick={() => {
              setVisiblePriceDetailsModal(!visiblePriceDetailsModal);
            }}
          >
            X
          </button>
        </div>
        <h1 style={{ marginBottom: "50px" }}>DÉTAILS DU PRIX</h1>
        <div className="allDetailsContainer">
          <h2>PÉRIODE DE LOCATION</h2>
          <div>
            <p>
              Durée de location ({rentalDurationInDays} jours x{" "}
              {offer.prices.dayPrice.amount})
            </p>
            <h3>
              €{" "}
              {(rentalDurationInDays * offer.prices.dayPrice.amount).toFixed(2)}
            </h3>
          </div>
          <h2>PROTECTIONS ET OPTIONS</h2>
          <div className="detailsContainer">
            <div>
              {selectedAdditionalCharges.map((charge) => (
                <div key={charge.id} className="detailsItem">
                  <div>
                    <p>
                      {charge.title} ({rentalDurationInDays} jours x{" "}
                      {charge.dayPrice})
                    </p>
                  </div>
                  <div>
                    <p>€ {rentalDurationInDays * charge.dayPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h2>FRAIS</h2>
          <div className="detailsContainer">
            <div>
              {rentDetails.extraFees.map((extraFee, index) => (
                <div key={index} className="detailsItem">
                  <p>{extraFee.title}</p>
                  <div className="prix">
                    <h3>€ {extraFee.price.amount}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>TOTAL</h2>
            <h3>€ {totalPrice}</h3>
          </div>
          <div className="taxesInclusesText">
            <p>(Taxes incluses)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
