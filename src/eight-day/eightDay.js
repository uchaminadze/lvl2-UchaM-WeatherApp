import "./eightDay.scss";
import React, { useEffect, useState } from "react";
import Loader from "../share components/loader";

const EightDay = ({ city }) => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const apiKey = "533da8f7488d45a384e8a432578ccb32";

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}&days=8`;
    fetch(apiUrl)
      .then((res) => res.json(setResponse(res.ok)))
      .then(({ data }) => {
        console.log(data);
        setWeather(serialData(data));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]);

  const serialData = (data) => {
    return data.map((el) => {
      return {
        time: el.datetime,
        min: el.app_min_temp,
        max: el.app_max_temp,
        icon: el.weather.icon,
        code: el.weather.code,
        desc: el.weather.description,
      };
    });
  };

  return (
    <div className="eight-forecast">
      <Loader isLoading={loading}>
        <h2>8-day forecast</h2>

        {response ? (
          <>
            {weather.map((el, index) => {
              return (
                <ul className="daily-list">
                  <div>
                    <li key={index}>{el.time}</li>
                  </div>

                  <div>
                    <li className="forecast-list" key={index}>
                      <img
                        key={index}
                        src={`https://www.weatherbit.io/static/img/icons/${el.icon}.png`}
                        alt={el.code}
                      />
                      {el.min} / {el.max} &#8451;
                    </li>
                  </div>
                  <div>
                    <li key={index}>{el.desc}</li>
                  </div>
                </ul>
              );
            })}
          </>
        ) : (
          <>
            <p>sorry, some kind of problem has occured</p>
          </>
        )}
      </Loader>
    </div>
  );
};

export default EightDay;
