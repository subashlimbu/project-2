import React from 'react'
import axios from 'axios'
import StationCard from './StationCard'
import { Link } from 'react-router-dom'


export default class LineStations extends React.Component {

  constructor() {
    super()
    this.state = {
      lineStations: null
    }
  }

  componentDidMount() {
    const lineId = this.props.match.params.linename
    axios.get(`https://api.tfl.gov.uk/Line/${lineId}/StopPoints?tflOperatedNationalRailStationsOnly=false`)
      .then(res => this.setState({ lineStations: res.data }))
      .catch(err => console.error(err))

  }

  render() {
    console.log(this.state.lineStations)
    if (!this.state.lineStations) return <p>Waiting for Data</p>
    return <section className="stationsIndex">
      <div className="section">
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {this.state.lineStations.map((station, index) => {
              return <Link key={index} to={`/stations/${station.id}`}>

                <StationCard key={index} {...station} />
              </Link>

            })}
          </div>
        </div>
      </div>
    </section>
  }

}