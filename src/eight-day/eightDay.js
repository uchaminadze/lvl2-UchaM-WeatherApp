import './eightDay.css';
import React, {useEffect, useState}from "react";

const EightDay = () => {
    const [allDatas, setAllDatas] = useState([]);

  useEffect(() => {
    const FetchApi = async () => {
      const apiKey = "2b01d92cb22b42c1ad21f966d1b3c3bb";
      const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=Tbilisi&key=${apiKey}`;
      const res = await fetch(apiUrl);
      console.log(res.ok);
      const { data } = await res.json();
      console.log(data)
      setAllDatas(data.splice(0, 8));
    };
    FetchApi();
  }, []);

    return(
        <div className="eight-forecast">
            <h2>8-day forecast</h2>
            {allDatas.map((allData, index) => {
        return (



            <ul className="daily-list">
                <div>
                <li key={index}>{allData.datetime}</li>
                </div>

                <div>
                <li className='forecast-list' key={index}><img key={index} src={`https://www.weatherbit.io/static/img/icons/${allData.weather.icon}.png`} alt={allData.weather.code} />  {allData.app_min_temp} / {allData.app_max_temp}  &#8451;</li>
                </div>

                <div>
                <li key={index}>{allData.weather.description}</li>
                </div>
            </ul>

        );
      })}
            
        </div>
    );
  }

  export default EightDay;

