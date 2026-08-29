import { Header } from "../components/Header";

import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { differenceInDays, parseISO } from "date-fns";
import { useLocation } from "react-router-dom";

import { ModalConfirmation } from "../components/ModalConfirmation";
import { API_URL } from "../config";

export const PersonnalDetails = () => {
  const location = useLocation();

  const {
    offer,
    rentDetails,
    pickupDate,
    returnDate,
    totalPrice,
    selectedAdditionalCharges,
  } = location.state || {};

  const rentalDurationInDays = differenceInDays(
    new Date(returnDate),
    new Date(pickupDate),
  );

  const mappedExtraFees = rentDetails.extraFees.map((extraFee) => ({
    feeTitles: extraFee.title,
    feePrices: extraFee.price.amount,
  }));
  const mappedAdditionalCharges = selectedAdditionalCharges.map(
    (additionalCharge) => ({
      optionTitles: additionalCharge.title,
      optionPrices: additionalCharge.dayPrice,
    }),
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

  const [reservationReference, setReservationReference] = useState("");
  const [visibleModalConfirmation, setVisibleModalConfirmation] =
    useState(false);

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
        `${API_URL}/reservations`,
        formattedData,
      );
      setReservationReference(response.data.reference);
      setVisibleModalConfirmation(!visibleModalConfirmation);
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
    parseISO(pickupDate),
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
          <section className="reviewCard">
            <h2>VÉRIFIER ET RÉSERVER</h2>

            <div className="reviewVehicle">
              <img
                src={offer.images.small}
                alt={offer.headlines.description}
              />
              <div className="reviewVehicleText">
                <h3>{offer.headlines.description}</h3>
                <p>{offer.headlines.longSubline}</p>
              </div>
            </div>

            <div className="reviewBlock">
              <h4>Votre offre inclut</h4>
              <ul className="reviewIncludes">
                {rentDetails.includedCharges.map((charge, index) => (
                  <li key={index}>{charge.title}</li>
                ))}
              </ul>
            </div>

            <div className="reviewBlock">
              <h4>Exigences pour les conducteurs</h4>
              <p className="reviewRequirement">
                Conducteur âgé d'au moins{" "}
                <strong>{offer.carGroupInfo.driverMinAge} ans</strong>
              </p>
            </div>

            <div className="reviewBlock">
              <h4>Période de location</h4>
              <div className="reviewLine">
                <span>
                  Durée de location ({rentDuration}{" "}
                  {rentDuration > 1 ? "jours" : "jour"} × €{" "}
                  {offer.prices.dayPrice.amount})
                </span>
                <span>
                  € {(rentDuration * offer.prices.dayPrice.amount).toFixed(2)}
                </span>
              </div>
            </div>

            {selectedAdditionalCharges.length > 0 && (
              <div className="reviewBlock">
                <h4>Protections et options</h4>
                {selectedAdditionalCharges.map((option) => (
                  <div className="reviewLine" key={option.id}>
                    <span>
                      {option.title} ({rentDuration} × € {option.dayPrice})
                    </span>
                    <span>
                      € {(option.dayPrice * rentDuration).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="reviewBlock">
              <h4>Frais</h4>
              {rentDetails.extraFees.map((fee, index) => (
                <div className="reviewLine" key={index}>
                  <span>{fee.title}</span>
                  <span>€ {fee.price.amount}</span>
                </div>
              ))}
            </div>

            <div className="reviewTotal">
              <span>TOTAL</span>
              <span>€ {totalPrice}</span>
            </div>
            <p className="reviewTaxes">(Taxes incluses)</p>

            <button type="submit" className="reviewSubmit">
              CONFIRMER
            </button>
          </section>
        </div>
      </form>
      {visibleModalConfirmation && (
        <ModalConfirmation
          setVisibleModalConfirmation={setVisibleModalConfirmation}
          visibleModalConfirmation={visibleModalConfirmation}
          reservationReference={reservationReference}
        />
      )}
    </>
  );
};
