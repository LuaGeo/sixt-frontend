// Search engines called in most of the pages, using packages from mui and react-select

import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AsyncSelect from "react-select/async";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { handleDisableButton } from "../utils/handleDisableButton";

export const LocationSearch = ({ currentPage }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [pickupStation, setPickupStation] = useState("");
  const [returnStation, setReturnStation] = useState("");

  const loadOptions = async (inputValue, callback) => {
    if (inputValue.length >= 3) {
      try {
        const response = await fetch(
          `https://site--sixt-backend--6v4khcscf8qp.code.run/locations?q=${inputValue}`
        );
        const data = await response.json();
        callback(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      callback([]);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setPickupStation(option.id);
    setReturnStation(option.id);
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
          <div className="locationSearchContainer">
            <AsyncSelect
              loadOptions={loadOptions}
              onChange={handleOptionChange}
              value={selectedOption}
              getOptionLabel={(option) => option.subtitle}
              getOptionValue={(option) => option.id}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "white",
                  color: "black",
                }),
                option: (provided) => ({
                  ...provided,

                  color: "black",
                }),
              }}
            />
          </div>
        </div>

        <div className="dates">
          <label>Date de départ</label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              orientation="landscape"
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
                setPickupDate(formattedDate);
              }}
              className="datePicker"
              format="DD/MM/YYYY hh:mm"
              minTime={dayjs().set("hour", 8)}
              maxTime={dayjs().set("hour", 18)}
              ampm={false}
              hoursStep={0.5}
              minutesStep={30}
              skipDisabled
            />
          </LocalizationProvider>
        </div>
        <div className="dates">
          <label>Date de retour</label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
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
              format="DD/MM/YYYY hh:mm"
              minTime={dayjs().set("hour", 8)}
              maxTime={dayjs().set("hour", 18)}
              ampm={false}
              minutesStep={30}
              skipDisabled
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
            }}
          >
            <button
              style={{ cursor: "pointer" }}
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
