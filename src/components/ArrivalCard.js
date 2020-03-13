import React from 'react'

const ArrivalCard = (arrival) => {

  return <div className="arrivalBox">
   
    <p className='dest'> <span className='destSpan'>{arrival.destinationName}</span></p>
    <p className='time'>: {Math.floor(parseInt(arrival.timeToStation) / 60)} minutes</p>
    
  </div>
}

export default ArrivalCard