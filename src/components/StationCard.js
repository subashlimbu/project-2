import React from 'react'
import { Link } from 'react-router-dom'

const StationCard = ({ commonName, id, handleClick, lineId }) => {

  const myCommonName = commonName.split(' ')
  myCommonName.pop()
  myCommonName.pop()
  const newCommonName = myCommonName.join(' ')

  return <div className='column is-two-quarter'>
    <Link to={`/stations/${lineId}/${id}`}></Link>
    <div className="card">
      <div className="card-content">
        <div className="title">
          <h4 className="card-title">{newCommonName}</h4>
        </div>
        <div className="subtitle">
    
        </div>
      </div>
      <footer className="card-footer">
        <div className='button'><Link className='myLink' to={`/stations/${lineId}/${id}`}>Arrivals:</Link></div>
       
        <div className="button" onClick={() => handleClick()}>Station Information</div>
    
      </footer>
    </div>
  </div>
}
export default StationCard

