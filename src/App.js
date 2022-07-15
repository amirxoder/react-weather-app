import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherServices";

function App() {
  const [query, setQuery] = useState({ q: "tehran" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData({ ...query, ...units }).then(
        (data) => {
          setWeather(data);
        }
      );
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <> 
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} />
          <Forecast title={"hourly forecast"} items={weather.hourly} />
          <Forecast title={"daily forecast"} items={weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;
