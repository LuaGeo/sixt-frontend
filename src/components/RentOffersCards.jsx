// Component that shows all the offers doing a map function in offerList and returning all the RentOfferCardItem model's card

import { Link } from "react-router-dom";
import { RentOfferCardItem } from "./RentOfferCardItem";

export const RentOffersCards = ({
  offersList,
  pickupDate,
  returnDate,
  visibleModal,
  setVisibleModal,
  searchTerm,
}) => {
  return (
    <div className="container">
      {offersList.map((offer) => (
        <Link
          key={offer.id}
          style={{
            textDecoration: "none",
            color: "black",
          }}
          onClick={() => {
            setVisibleModal(!visibleModal);
          }}
          state={{ offer, returnDate, pickupDate, searchTerm }}
        >
          <RentOfferCardItem
            offer={offer}
            pickupDate={pickupDate}
            returnDate={returnDate}
          />
        </Link>
      ))}
    </div>
  );
};
