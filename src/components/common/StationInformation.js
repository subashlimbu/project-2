import React from 'react'
const StationInformation = ({ station,  toggleModal }) => {
  console.log(station)
  return <div className="modal is-active">
    <div className="modal-background" onClick={() => toggleModal()}></div>
    <div className="modal-content ">
      {/* <p>{station.commonName}</p> */}
      {station.additionalProperties.map(property => {
        return <>
        {(!(property.category === 'NearestPlaces')) && <div className="column is-half is-centered is-multiline"> {property.key}</div>}
        </>
      })}
    </div>
    <button className="modal-close is-large" aria-label="close"></button>
  </div>
}
export default StationInformation
