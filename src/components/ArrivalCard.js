import React from 'react'

const ArrivalCard = (arrival) => {

  return <div className="arrivalBox">
   
    <p>Arriving in: {Math.floor(parseInt(arrival.timeToStation) / 60)} minutes</p>
    <p>{arrival.platformName}</p>
  </div>
}

export default ArrivalCard