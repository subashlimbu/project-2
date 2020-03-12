import React from 'react'

const ArrivalCard = (arrival) => {

  return <div className="arrivalBox">
    <p className='subtitle'>Destination: {arrival.destinationName}</p>
    <p>Arriving in: {Math.floor(parseInt(arrival.timeToStation) / 60)} minutes</p>
  </div>
}

export default ArrivalCard