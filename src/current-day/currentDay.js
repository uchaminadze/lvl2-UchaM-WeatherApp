import React, { useEffect, useState } from "react";
import Modal from "../modal/modal";
import CurrentTime from "./currentTime";
import "./current.css";

const FetchWeather = ({ city }) => {
  const [allDatas, setAllDatas] = useState([]);
  const [hourData, setHourData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const FetchApi = async () => {
      const apiKey = "2b01d92cb22b42c1ad21f966d1b3c3bb";
      const apiUrl = `https://api.weatherbit.io/v2.0/current?&city=${city}&units=metric&key=${apiKey}`;
      const res = await fetch(apiUrl);
      console.log(res.ok);
      const { data } = await res.json();
      console.log(data);
      setAllDatas(data);
    };

    FetchApi();
  }, [city]);

  useEffect(() => {
    const FetchApi = async () => {
      const apiKey = "2b01d92cb22b42c1ad21f966d1b3c3bb";
      const hourUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&key=${apiKey}&hours=10`;
      const hourRes = await fetch(hourUrl);
      console.log(hourRes.ok);
      const { data } = await hourRes.json();
      console.log(data);
      setHourData(data);
    };
    FetchApi();
  }, [city]);

  return (
    <div className="current-forecast">
      <CurrentTime />
      {allDatas.map((allData) => {
        return (
          <div>
            <h2>
              {allData.city_name}, {allData.country_code}
            </h2>
            <h2 className="current-temp">
              <img
                src={`https://www.weatherbit.io/static/img/icons/${allData.weather.icon}.png`}
                alt={allData.weather.code}
              />
              {allData.temp}&#8451;
            </h2>
            <div className="wind">
              <p className="current-desc">
                Feels like {allData.app_temp} &#8451;,{" "}
                {allData.weather.description}
              </p>
              <div className="wind-forecast">
                <div className="wind-forecast-left">
                  <p>{allData.wind_spd} m/s</p>
                  <p>Humidity: {allData.rh}%</p>
                  <p>Dew point: {allData.dewpt} &#8451;</p>
                </div>
                <div className="wind-forecast-right">
                  <p>{allData.aqi}</p>
                  <p>UV: {allData.uv}</p>
                  <p>Visibility: {allData.vis} km</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button className="forecast-btn" onClick={() => setIsOpen(true)}>
        Hourly forecast
      </button>

      <Modal
        open={isOpen}
        title={
          <div className="modal-title">
            <h3>Wed, June 16</h3>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
        }
      >
        <div className="hourly-container">
          {hourData.map((el, index) => {
            return (
              <div>
                <div className="hourly-list">
                  <ul>
                    <li>{el.datetime}</li>
                  </ul>
                  <ul>
                    <li className="hourly-temp">
                      <img
                        src={`https://www.weatherbit.io/static/img/icons/${el.weather.icon}.png`}
                        alt={el.weather.code}
                      />
                      {el.temp} &#8451;
                    </li>
                  </ul>
                  <ul>
                    <li>{el.weather.description}</li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default FetchWeather;
