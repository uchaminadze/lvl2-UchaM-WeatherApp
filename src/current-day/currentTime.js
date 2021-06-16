import React, { useEffect, useState } from 'react';

const CurrentTime = () =>{
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const month = date.getUTCMonth() + 1; //months from 1-12
    const day = date.getUTCDate();

    const newDate =  month + " / " + day;



    useEffect(() => {
        const timer = setInterval(() =>{
            setTime(new Date())
        })

        setDate(new Date())

        return () => {
            clearInterval(timer);
          }
    }, [])



    return(
        <div>
            <h3 className="current-date">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}, {newDate}</h3>
        </div>
    )
}


export default CurrentTime;