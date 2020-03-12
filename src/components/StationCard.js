import React from 'react'
import { Link } from 'react-router-dom'

const StationCard = ({ commonName, id, handleClick }) => {
  return <div className='column is-two-quarter'>
    <Link to={`/stations/${id}`}></Link>
    <div className="card">
      <div className="card-content">
        <div className="title">
          <h4 className="card-title">{commonName}</h4>
        </div>
        <div className="subtitle">
          Fetching..
        </div>
      </div>
      <footer className="card-footer">
        <div className='button'><Link to={`/stations/${id}`}>Arrivals:</Link></div>
       
        <div className="button" onClick={() => handleClick()}>Station Information</div>
    
      </footer>
    </div>
  </div>
}
export default StationCard

