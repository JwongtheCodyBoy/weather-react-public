import { useState, useEffect } from "react";
import React from "react";
import Topbuttons from "./components/Topbuttons.jsx";
import SearchBar from "./components/SearchBar.jsx";
import TimeandLoc from "./components/TimeandLoc.jsx";
import TempAndDetails from "./components/TempAndDetails.jsx";
import Forecast from "./components/Forecast.jsx";
import getFormattedWeatherData from "./scripts/weatherAPI.js";

const App = () => {
  const [query, setQuery] = useState({ q: "tampa" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      setWeather(data);
      console.log(data);
    });
  };

  const checkSunUp = (time, riseTime, setTime) => {
    return time >= riseTime && time <= setTime;
  }

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const bgColor = () => {
    if (!weather) return "bg-gradient-to-br from-cyan-700 to-blue-700";
    const coldThreshold = units === "metric" ? 10 : 50;

    if (weather.condition === "Clear" && checkSunUp(weather.dt, weather.rawSunrise, weather.rawSunSet))
      return "bg-gradient-to-br from-sky-600 to-blue-800"
    else if (weather.condition === "Clear")
      return "bg-gradient-to-b from-zinc-950 to-blue-950"
    else if (weather.condition === "Rain" || weather.condition === "Clouds")
      return "bg-gradient-to-b from-gray-700 to-slate-800";
    else if (weather.condition === "Thunderstorm")
      return "bg-gradient-to-b from-stone-700 to-neutral-700"; 
    else if (weather.condition === "Snow" || weather.temp <= coldThreshold)
      return "bg-gradient-to-b from-sky-200 to-indigo-300";
    return "bg-gradient-to-b from-gray-800 to-neutral-800";
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 shadow-gray-400 text-white h-fit shadow-xl ${bgColor()}`}
    >
      <Topbuttons setQuery={setQuery} />
      <SearchBar setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <>
          <TimeandLoc weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title="3 hour forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
        </>
      )}
    </div>
  );
};

export default App;
