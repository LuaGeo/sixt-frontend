// Carte d'une offre, affichée dans la grille de RentOffersCards.

import { differenceInDays } from "date-fns";
import { calculateTotalPrice } from "../utils/calculateTotalPrice";

export const RentOfferCardItem = ({ offer, pickupDate, returnDate }) => {
  const rawTotal = calculateTotalPrice({ offer, pickupDate, returnDate });
  const totalPrice = Number.isFinite(Number(rawTotal)) ? rawTotal : null;
  const days = Math.max(
    differenceInDays(new Date(returnDate), new Date(pickupDate)) || 0,
    0
  );

  const { maxPassengers, doors, automatic, baggage } = offer.carGroupInfo;
  // "ou similaire | SUV Premium" -> "SUV Premium"
  const category = offer.headlines.shortSubline.split("|").pop().trim();

  return (
    <article className="carCard">
      <div className="carCard__media">
        <img
          src={offer.images.small}
          alt={offer.headlines.longSubline}
          loading="lazy"
        />
        <span className="carCard__badge">{category}</span>
      </div>

      <div className="carCard__body">
        <h3 className="carCard__title">{offer.headlines.description}</h3>
        <p className="carCard__sub">{offer.headlines.shortSubline}</p>

        <ul className="carCard__specs">
          <li title="Passagers">
            <i className="ico-maxPassengers" aria-hidden="true" />
            <span>{maxPassengers}</span>
          </li>
          <li title="Portes">
            <i className="ico-doors" aria-hidden="true" />
            <span>{doors}</span>
          </li>
          <li title="Bagages">
            <i className="ico-baggage" aria-hidden="true" />
            <span>{baggage}</span>
          </li>
          <li title="Boîte de vitesses">
            <i className="ico-automatic" aria-hidden="true" />
            <span>{automatic ? "Auto" : "Manuelle"}</span>
          </li>
        </ul>

        <p className="carCard__mileage">
          <i className="ico-bullet-sm" aria-hidden="true" />
          {offer.headlines.mileageInfo}
        </p>
      </div>

      <div className="carCard__footer">
        <div className="carCard__price">
          <strong>{offer.prices.dayPrice.amount.toFixed(2)} €</strong>
          <span>/ jour</span>
        </div>
        {totalPrice && days > 0 && (
          <div className="carCard__total">
            {totalPrice} € · {days} j
          </div>
        )}
      </div>
    </article>
  );
};
