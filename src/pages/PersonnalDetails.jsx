import { Header } from "../components/Header";

import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { differenceInDays, parseISO } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

export const PersonnalDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    offer,
    rentDetails,
    pickupDate,
    returnDate,
    totalPrice,
    selectedAdditionalCharges,
    pickupStation,
    searchTerm,
  } = location.state || {};

  console.log(totalPrice);
  console.log(typeof totalPrice);

  const rentalDurationInDays = differenceInDays(
    new Date(returnDate),
    new Date(pickupDate)
  );

  const mappedExtraFees = rentDetails.extraFees.map((extraFee) => ({
    feeTitles: extraFee.title,
    feePrices: extraFee.price.amount,
  }));
  const mappedAdditionalCharges = selectedAdditionalCharges.map(
    (additionalCharge) => ({
      optionTitles: additionalCharge.title,
      optionPrices: additionalCharge.dayPrice,
    })
  );

  const [salutation, setSalutation] = useState("");
  const [company, setCompany] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const countriesList = useMemo(() => countryList().getData(), []);
  const countryCodesList = useMemo(() => countryList().getValues(), []);

  const handleSubmitNewReservation = async (event) => {
    event.preventDefault();
    try {
      const formattedData = {
        pickupDate,
        returnDate,
        // location: searchTerm,
        rentalDurationInDays,
        clientDetails: {
          firstName,
          lastName,
          email,
        },
        totalPrice,
        vehicleDetails: {
          vehicleType: offer.headlines.description,
          vehicleDescription: offer.headlines.longSubline,
          vehiclePhoto: offer.images.small,
          priceDetails: {
            dayPrice: offer.prices.dayPrice.amount,
            fees: mappedExtraFees,
            options: mappedAdditionalCharges,
          },
        },
      };

      const response = await axios.post(
        "https://site--sixt-backend--6v4khcscf8qp.code.run/reservations",
        formattedData
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country.label);
  };

  const handlePhoneNumber = (phone) => {
    setPhoneNumber(phone);
  };

  const rentDuration = differenceInDays(
    parseISO(returnDate),
    parseISO(pickupDate)
  );

  return (
    <>
      <Header currentPage={"PersonnalDetails"} />
      <form onSubmit={handleSubmitNewReservation}>
        <div className="personnalDetailsContainer">
          <h2>INFORMATIONS PERSONNELLES</h2>
          <div className="formContainer">
            <div className="leftColumnForm">
              <div className="radioInputs">
                <input
                  type="radio"
                  name="salutation"
                  value="Mme."
                  checked={salutation === "Mme."}
                  onChange={() => setSalutation("Mme.")}
                />
                <label htmlFor="Mme." className="inputCivility">
                  <p>Mme.</p>
                </label>
                <input
                  type="radio"
                  name="salutation"
                  value="Mx."
                  checked={salutation === "Mx."}
                  onChange={() => setSalutation("Mx.")}
                />
                <label htmlFor="Mx." className="inputCivility">
                  <p>Mx.</p>
                </label>
                <input
                  type="radio"
                  name="salutation"
                  value="M."
                  checked={salutation === "M."}
                  onChange={() => setSalutation("M.")}
                />
                <label htmlFor="M." className="inputCivility">
                  <p>M.</p>
                </label>
              </div>
              <div className="formCompany">
                <input
                  type="text"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Société"
                />
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Prénom *"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Adresse email *"
                required
              />
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Numéro et voie *"
                required
              />
              <div>
                <label htmlFor="country">Pays</label>
                <Select
                  options={countriesList}
                  value={selectedCountry}
                  placeholder={selectedCountry}
                  onChange={handleCountryChange}
                />
              </div>
              <div>
                <label htmlFor="birthDate">DATE DE NAISSANCE *</label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  onChange={(event) => setBirthdate(event.target.value)}
                  value={birthdate}
                />
              </div>
            </div>

            <div className="rightColumnForm">
              <div className="fullName">
                <input
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Nom de famille *"
                  required
                />
              </div>
              <div className="contacts">
                <PhoneInput
                  defaultCountry="FR"
                  placeholder="Numéro de téléphone *"
                  onChange={handlePhoneNumber}
                  value={phoneNumber}
                  countries={countryCodesList}
                />
              </div>
              <div className="address">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  placeholder="Code postal *"
                  required
                />
                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Ville *"
                  required
                />
              </div>
            </div>
          </div>
          <h2>VÉRIFIER ET RÉSERVER</h2>

          <div className="backofficeoModalTitleInfosContainer">
            <div>
              <h3>{offer.headlines.description}</h3>
              <p>{offer.headlines.longSubline}</p>
            </div>
            <img src={offer.images.small} alt="" />
          </div>
          <h3>VOTRE OFFRE INCLUT</h3>
          {rentDetails.includedCharges.map((charge, index) => (
            <p key={index} className="ico-bullet-sm">
              {charge.title}
            </p>
          ))}
          <h3>EXIGENCES POUR LES CONDUCTEURS</h3>
          <p>
            ▹ Conducteur agé d'au moins{" "}
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {offer.carGroupInfo.driverMinAge} ans{" "}
            </span>
          </p>
          <div className="prixDetails">
            <h3>PÉRIODE DE LOCATION</h3>
            <div className="periode">
              <p>
                Duré de location {rentDuration} jours x{" "}
                {offer.prices.dayPrice.amount}
              </p>

              <p>
                € {(rentDuration * offer.prices.dayPrice.amount).toFixed(2)}
              </p>
            </div>
            <h3>PROTECTIONS ET OPTIONS</h3>
            <div className="options">
              {selectedAdditionalCharges.map((option) => (
                <div key={option.id}>
                  <p>
                    {option.title} ({rentDuration} x {option.dayPrice})
                  </p>

                  <p>€ {(option.dayPrice * rentDuration).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <h1 style={{ color: "black" }}>FRAIS</h1>
            <div className="options">
              {rentDetails.extraFees.map((fee, index) => (
                <div key={index}>
                  <p>{fee.title}</p>
                  <p>€ {fee.price.amount}</p>
                </div>
              ))}
            </div>
            <div className="reservationTotal">
              <h3>TOTAL</h3>
              <p>€{totalPrice}</p>
            </div>
          </div>
          <div className="buttonSubmitForm">
            <button>CONFIRMER</button>
          </div>
        </div>
      </form>
    </>
  );
};
