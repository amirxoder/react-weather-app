import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

const Inputs = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  const searchClickHandler = () => {
    if (city !== "") setQuery({ q: city });
    setCity("");
  };

  const locationClickHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.latitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const unitChangeHandler = (e) => {
    const selectedUnit = e.target.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
    }
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          placeholder="Search for city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type={"text"}
          className="text-xl font-light p-2 w-full shadow-xl outline-none capitalize placeholder:lowercase "
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={searchClickHandler}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={locationClickHandler}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition hover:scale-125"
          onClick={unitChangeHandler}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imerial"
          className="text-xl text-white font-light transition hover:scale-125"
          onClick={unitChangeHandler}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
