// Card model called in RentOffersCard used to construct each offer

import { calculateTotalPrice } from "../utils/calculateTotalPrice";

export const RentOfferCardItem = ({ offer, pickupDate, returnDate }) => {
  const totalPrice = calculateTotalPrice({ offer, pickupDate, returnDate });

  return (
    <article>
      <div className="articleTitle">
        <h2>{offer.headlines.description.toUpperCase()}</h2>
      </div>
      <p>{offer.headlines.shortSubline}</p>
      <img src={offer.images.small} alt={offer.headlines.longSubline} />
      <p>{offer.headlines.mileageInfo}</p>
      <h3>€ {offer.prices.dayPrice.amount} jour</h3>
      <p>€ {totalPrice} total</p>
    </article>
  );
};
