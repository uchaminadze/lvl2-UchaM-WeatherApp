import React, {useEffect, useState}from "react";
import Modal from "../modal/modal";
import CurrentTime from "./currentTime";
import './current.css';

const  FetchWeather = () => {
    const [allDatas, setAllDatas] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const FetchApi = async () => {
      const apiKey = "2b01d92cb22b42c1ad21f966d1b3c3bb";
      const apiUrl = `https://api.weatherbit.io/v2.0/current?&city=tbilisi&units=metric&key=${apiKey}`;
      const res = await fetch(apiUrl);
      console.log(res.ok);
      const { data } = await res.json();
      console.log(data);
      setAllDatas(data);
    };
    FetchApi();
  }, []);

    return(
        <div className="current-forecast">

            <CurrentTime/>
            {allDatas.map((allData, ) => {
        return (
          <div>
            <h2 >{allData.city_name}</h2>
                 <h2  className='current-temp'>
                     <img src={`https://www.weatherbit.io/static/img/icons/${allData.weather.icon}.png`} alt={allData.weather.code} />
                     {allData.temp}&#8451;
                     </h2>
                     <div className="wind">
                     <p className='current-desc'>Feels like {allData.app_temp} &#8451;,  {allData.weather.description}</p>
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




            <button className="forecast-btn"  onClick={() => setIsOpen(true)}>Hourly forecast</button>
            <Modal open={isOpen} allData={allDatas} title={
            <div className="modal-title">
                <h3>Wed, June 16</h3>
                <button onClick={() => setIsOpen(false)}>X</button>
            </div>}>
            </Modal>
            
        </div>
    );
  }

  export default FetchWeather;