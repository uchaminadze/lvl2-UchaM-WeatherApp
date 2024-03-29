import React, { useEffect, useState } from "react";
import Modal from "../share components/modal";
import "./current.scss";

const FetchWeather = ({ city }) => {
  const [weather, setWeather] = useState({});
  const [hourData, setHourData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState();
  const [currentResponse, setCurrentResponse] = useState();
  const apiKey = "533da8f7488d45a384e8a432578ccb32";
  useEffect(() => {
    const apiUrl = `https://api.weatherbit.io/v2.0/current?&city=${city}&units=metric&key=${apiKey}`;
    fetch(apiUrl)
      .then((res) => res.json(setCurrentResponse(res.ok)))
      .then(({ data }) => {
        setWeather(serialData(data));
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [city]);

  useEffect(() => {
    const apiUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&key=${apiKey}`;
    fetch(apiUrl)
      .then((res) => res.json(setResponse(res.ok)))
      .then(({data}) => {
        setHourData(serialData(data));
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      })
      
  }, [city]);

  const serialData = (data) => {
    return data.map((el) => {
      return {
        time: el.datetime,
        name: el.city_name,
        country: el.country_code,
        icon: el.weather.icon,
        code: el.weather.code,
        temp: el.temp,
        app_temp: el.app_temp,
        desc: el.weather.description,
        wind: el.wind_spd,
        rh: el.rh,
        dewpt: el.dewpt,
        aqi: el.aqi,
        uv: el.uv,
        visibility: el.vis,
      };
    });
  };

  return (
    <div className="current-forecast">
      {currentResponse ? (
        <>
          {weather[0] && (
            <div>
              <h3 className="current-date">{weather[0].time}</h3>
              <h2>
                {weather[0].name}, {weather[0].country}
              </h2>
              <h2 className="current-temp">
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${weather[0].icon}.png`}
                  alt={weather[0].code}
                />
                {weather[0].temp}&#8451;
              </h2>
              <div className="wind">
                <p className="current-desc">
                  Feels like {weather[0].app_temp} &#8451;, {weather[0].desc}
                </p>
                <div className="wind-forecast">
                  <div className="wind-forecast-left">
                    <p>{weather[0].wind} m/s</p>
                    <p>Humidity: {weather[0].rh}%</p>
                    <p>Dew point: {weather[0].dewpt} &#8451;</p>
                  </div>
                  <div className="wind-forecast-right">
                    <p>{weather[0].aqi}</p>
                    <p>UV: {weather[0].uv}</p>
                    <p>Visibility: {weather[0].visibility} km</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <p>sorry, some kind of problem has occured</p>
        </>
      )}

      <button className="forecast-btn" onClick={() => setIsOpen(true)}>
        Hourly forecast
      </button>


  {response ? (

    <>
          {hourData[0] && (
        <Modal
          open={isOpen}
          title={
            <div className="modal-title">
              <h3>{hourData[0].time}</h3>
              <button onClick={() => setIsOpen(false)}>X</button>
            </div>
          }
        >
          <div className="hourly-container">
            {hourData.map((el) => {
              return (
                <div>
                  <div className="hourly-list">
                    <ul>
                      <li>{el.time}</li>
                    </ul>
                    <ul>
                      <li className="hourly-temp">
                        <img
                          src={`https://www.weatherbit.io/static/img/icons/${el.icon}.png`}
                          alt={el.code}
                        />
                        {el.temp} &#8451;
                      </li>
                    </ul>
                    <ul>
                      <li>{el.desc}</li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </>

      ) : (
        <>
          <Modal
            open={isOpen}
            title={
              <div className="modal-title">
                <button onClick={() => setIsOpen(false)}>X</button>
              </div>
            }
          >
            <div className="hourly-container">
              <p>sorry, some kind of problem has occured</p>
              {console.log(response)}
            </div>
          </Modal>
        </>
      )}

    </div>
  );
};

export default FetchWeather;
