import React, { useState } from "react";
import "./App.scss";
import FetchWeather from "./current-day/currentDay";
import EightDay from "./eight-day/eightDay";

function App() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("tbilisi");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
  };
  return (
    <div className="App">
      {/* <Loader isLoading={loading}> */}
      <form>
        <input onChange={(e) => handleChange(e)} />
        <button className="search-btn" onClick={(e) => handleSubmit(e)}>
          Search
        </button>
      </form>
      <div className="content">
        <FetchWeather city={city} />
        <EightDay city={city} />
      </div>
      {/* </Loader> */}
    </div>
  );
}

export default App;
