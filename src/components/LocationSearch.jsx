// Search engines called in most of the pages, using dataPickers packages from @mui

import React, { useState, useEffect, useRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";
import { handleDisableButton } from "../utils/handleDisableButton";

export const LocationSearch = ({ currentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [pickupStation, setPickupStation] = useState("");
  const [returnStation, setReturnStation] = useState("");

  const suggestionsContainerRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length >= 3) {
        try {
          const response = await fetch(
            `https://site--sixt-backend--6v4khcscf8qp.code.run/locations?q=${searchTerm}`
          );
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      suggestionsContainerRef.current &&
      !suggestionsContainerRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSelectedSuggestion(-1);
  };

  const handleSuggestionClick = (location) => {
    setSearchTerm(location.subtitle);
    setPickupStation(location.id);
    setReturnStation(location.id);
    setSuggestions([]);
  };

  return (
    <div className="hero">
      {currentPage === "Home" && (
        <ul>
          <li>VOITURES</li>
          <li>UTILITAIRES</li>
        </ul>
      )}
      <div className="searchEngines">
        <div className="citiesSearchBar">
          <label>Retrait et retour</label>
          <span className="ico-search"></span>
          <div className="locationSearchContainer">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              // onKeyDown={handleKeyDown}
            />
            <div className="suggestionsContainer" ref={suggestionsContainerRef}>
              {suggestions.map((location, index) => (
                <div
                  key={location.id}
                  className={`suggestion ${
                    index === selectedSuggestion ? "selected" : ""
                  }`}
                  onClick={(event) => {
                    handleSuggestionClick(event, location);
                    setSearchTerm(location.subtitle);
                    setPickupStation(location.id);
                    setReturnStation(location.id);
                  }}
                >
                  {location.subtitle}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="dates">
          <label>Date de départ</label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              orientation="landscape"
              onChange={(value) => {
                const dateString = value.$d;
                const dateObject = new Date(dateString);
                const day = String(dateObject.getDate()).padStart(2, "0"); // Add leading zero if necessary
                const month = String(dateObject.getMonth() + 1).padStart(
                  2,
                  "0"
                ); // Add leading zero if necessary
                const year = dateObject.getFullYear();
                const formattedDate = `${year}-${month}-${day}`;
                setPickupDate(formattedDate);
              }}
              className="datePicker"
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </div>
        <div className="dates">
          <label>Date de retour</label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(value) => {
                const dateString = value.$d;
                const dateObject = new Date(dateString);
                const day = String(dateObject.getDate()).padStart(2, "0");
                const month = String(dateObject.getMonth() + 1).padStart(
                  2,
                  "0"
                );
                const year = dateObject.getFullYear();
                const formattedDate = `${year}-${month}-${day}`;
                setReturnDate(formattedDate);
              }}
              className="datePicker"
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </div>
        {currentPage === "Home" && (
          <Link
            to={"/offerlist"}
            state={{
              pickupStation,
              returnStation,
              pickupDate,
              returnDate,
              searchTerm,
            }}
          >
            <button
              // style={buttonStyle}
              disabled={handleDisableButton(
                pickupStation,
                returnStation,
                pickupDate,
                returnDate
              )}
            >
              VOIR LES OFFRES
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
