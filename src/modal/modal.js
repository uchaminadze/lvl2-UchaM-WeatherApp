import React, {useEffect, useState}from "react";
import './modal.css';

const Modal = (props) =>{
    const [allDatas, setAllDatas] = useState([]);
  useEffect(() => {
    const FetchApi = async () => {
      const apiKey = "2b01d92cb22b42c1ad21f966d1b3c3bb";
      const apiUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=Tbilisi&key=${apiKey}&hours=10`;
      const res = await fetch(apiUrl);
      console.log(res.ok);
      const { data } = await res.json();
      console.log(data);
      setAllDatas(data);
    };
    FetchApi();
  }, []);

    if(!props.open) return null

     return(
        <div>
                 <div className="modal-container" />
            {allDatas.map((allData, index) => {
        return (
            
<div>
            <div className="modal">
             {props.title}
             <div className="hourly-list">
                    <ul>
                    <li>{allData.datetime}</li>
                    </ul>
                    <ul>
                    <li>{allData.temp} &#8451;</li>
                    </ul>
                    <ul>
                    <li>{allData.weather.description}</li>
                    </ul>
                </div>
         </div>
</div>

        );
      })}
        </div>
    )
}

export default Modal;