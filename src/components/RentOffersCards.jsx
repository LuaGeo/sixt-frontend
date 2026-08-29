// Grille des offres + filtre par catégorie (page OfferList).

import { RentOfferCardItem } from "./RentOfferCardItem";
import Select from "react-select";
import { useMemo, useState } from "react";

const CATEGORIES = [
  { value: "Berline", label: "Berline" },
  { value: "SUV", label: "SUV" },
  { value: "Cabriolet", label: "Cabriolet" },
  { value: "Coupé", label: "Coupé" },
  { value: "Pick-up", label: "Pick-up" },
];

export const RentOffersCards = ({
  offersList,
  pickupDate,
  returnDate,
  setVisibleModal,
  onSelectOffer,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredOffers = useMemo(() => {
    const wanted = new Set((selectedCategories || []).map((c) => c.value));
    return offersList
      .filter(
        (offer) => wanted.size === 0 || wanted.has(offer.carGroupInfo?.bodyStyle)
      )
      .sort(
        (a, b) => a.prices.dayPrice.amount - b.prices.dayPrice.amount
      );
  }, [offersList, selectedCategories]);

  const handleSelect = (offer) => {
    onSelectOffer?.(offer);
    setVisibleModal(true);
  };

  return (
    <section className="offerListMain">
      <div className="offerFilterBar">
        <span className="offerFilterBar__label">Filtrez par catégorie :</span>
        <Select
          isMulti
          name="categories"
          options={CATEGORIES}
          className="offerFilterBar__select"
          classNamePrefix="select"
          placeholder="Toutes les catégories"
          noOptionsMessage={() => "Aucune catégorie"}
          value={selectedCategories}
          onChange={(value) => setSelectedCategories(value || [])}
        />
        <span className="offerFilterBar__count">
          {filteredOffers.length} / {offersList.length} offres
        </span>
      </div>

      {filteredOffers.length === 0 ? (
        <p className="offerGrid__empty">
          Aucun véhicule ne correspond à cette sélection.
        </p>
      ) : (
        <div className="offerGrid">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="carCardLink"
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(offer)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleSelect(offer);
                }
              }}
            >
              <RentOfferCardItem
                offer={offer}
                pickupDate={pickupDate}
                returnDate={returnDate}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
