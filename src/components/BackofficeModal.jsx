// Modal that opens when clicking on a reservation in BackOffice's page showing the reservation details

import { useLocation } from "react-router-dom";

export const BackofficeModal = ({
  visibleBackofficeModal,
  setVisibleBackofficeModal,
}) => {
  const location = useLocation();

  const { reservation, offer } = location.state || {};
  console.log(offer);
  return (
    <div
      className="backofficeoModalContainer"
      onClick={() => {
        setVisibleBackofficeModal(!visibleBackofficeModal);
      }}
    >
      <div
        className="backofficeoModalInfosContainer"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="backofficeoModalTitleInfosContainer">
          <div>
            <h1 style={{ color: "black" }}>
              {reservation.vehicleDetails.vehicleType}{" "}
            </h1>
            <h2>{reservation.vehicleDetails.vehicleDescription}</h2>
          </div>
          <img
            src={reservation.vehicleDetails.vehiclePhoto}
            alt={reservation.vehicleDetails.vehicleType}
          />
          <button
            className="ico-close"
            onClick={() => {
              setVisibleBackofficeModal(!visibleBackofficeModal);
            }}
          ></button>
        </div>

        <div className="priceAndClientDetailsContainer">
          <div className="prixDetails">
            <h1 style={{ color: "black" }}>PÉRIODE DE LOCATION</h1>
            <div className="periode">
              <p>
                Duré de location ({reservation.durationInDays} jours x{" "}
                {reservation.vehicleDetails.priceDetails.dayPrice} )
              </p>

              <p>
                €{" "}
                {(
                  reservation.durationInDays *
                  reservation.vehicleDetails.priceDetails.dayPrice
                ).toFixed(2)}
              </p>
            </div>
            <h1 style={{ color: "black" }}>PROTECTIONS ET OPTIONS</h1>
            <div className="options">
              {reservation.vehicleDetails.priceDetails.options.map(
                (option, index) => (
                  <div key={index}>
                    <p>{option.optionTitles}</p>
                    <p>{option.optionPrices}</p>
                  </div>
                )
              )}
            </div>
            <h1 style={{ color: "black" }}>FRAIS</h1>
            <div className="options">
              {reservation.vehicleDetails.priceDetails.fees.map(
                (option, index) => (
                  <div key={index}>
                    <p>{option.feeTitles}</p>
                    <p>{option.feePrices}</p>
                  </div>
                )
              )}
            </div>
            <div className="total">
              <p>TOTAL</p>
              <p>{reservation.totalCost}</p>
            </div>
          </div>
          <div className="clientInfos">
            <p style={{ textDecoration: "underline", marginBottom: "10px" }}>
              Infos Client
            </p>
            <p>
              Nom complet :{" "}
              {reservation.clientDetails.firstName.charAt(0).toUpperCase()}{" "}
              {reservation.clientDetails.lastName.toUpperCase()}
            </p>
            <p>Email : {reservation.clientDetails.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
