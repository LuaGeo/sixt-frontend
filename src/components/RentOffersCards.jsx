// Component that shows all the offers doing a map function in offerList and returning all the RentOfferCardItem model's card

import { Link } from "react-router-dom";
import { RentOfferCardItem } from "./RentOfferCardItem";
import Select from "react-select";
import React, { useState } from "react";

export const RentOffersCards = ({
  offersList,
  pickupDate,
  returnDate,
  visibleModal,
  setVisibleModal,
  searchTerm,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { value: "Cabriolet", label: "Cabriolet" },
    { value: "Berline", label: "Berline" },
    { value: "SUV", label: "SUV" },
    { value: "Coupé", label: "Coupé" },
    { value: "Pick-up", label: "Pick-up" },
  ];

  const filteredOffers =
    selectedCategories.length > 0
      ? offersList.filter((offer) =>
          selectedCategories.some(
            (category) => offer.carGroupInfo.bodyStyle === category.value
          )
        )
      : offersList;

  return (
    <div className="container">
      <div className="categories">
        <p style={{ color: "#fff" }}>Filtrez par catégorie :</p>
        <Select
          isMulti
          name="categories"
          options={categories}
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
        <p style={{ color: "#fff" }}>
          ( {filteredOffers.length} / {offersList.length} ) offres
        </p>
      </div>
      <div className="container">
        {filteredOffers.map((offer) => (
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
    </div>
  );
};
