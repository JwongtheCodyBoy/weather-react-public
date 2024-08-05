import { useState } from "react";
import React from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

const SearchBar = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city != "") setQuery({ q: city });
  };

  const currentLocal = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords
        setQuery({lat: latitude, lon: longitude})
      })
    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search..."
          className="text-x1 font-light p-2 w-full shadpw-x1 focus:outline-none capitalize text-gray-900"
          onKeyDown={(e) => {
            // prettier-ignore
            if (e.key === "Enter")
              handleSearchClick();
          }}
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={currentLocal}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="celsius"
          className="text-white text-xl font font-light transition ease-out hover:scale-110"
          onClick={() => setUnits("metric")}
        >
          C°
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="fahrenheit"
          className="text-white text-xl font font-light transition ease-out hover:scale-110"
          onClick={() => setUnits("imperial")}
        >
          F°
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
