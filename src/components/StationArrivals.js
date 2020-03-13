import React from 'react'
import axios from 'axios'
import LoaderSpinner from './common/LoaderSpinner'
import ArrivalCard from './ArrivalCard'


export default class SataionArrivals extends React.Component {

  constructor() {
    super()
    this.state = {
      arrivalsInformation: null
    }
  }


  componentDidMount() {

    const id = this.props.match.params.id
    const line = this.props.match.params.line
    axios.get(`https://api.tfl.gov.uk/Line/${line}/Arrivals/${id}`)
      .then(res => this.setState({ arrivalsInformation: res.data }))
      .catch(err => console.error(err))
    console.log('Hello')

  }
  sortArrivalsInformation(info) {
    info.sort(function (a, b) {
      return parseInt(a.timeToStation) - parseInt(b.timeToStation)
    })
  }


  render() {
    if (!this.state.arrivalsInformation) return <LoaderSpinner />

    console.log(this.state.arrivalsInformation)
    const trains = []
    this.state.arrivalsInformation.map((arrival) => {

      if (!trains.includes(arrival.destinationName)) {
        trains.push(arrival.destinationName)
      }
    })
    const line = this.props.match.params.line


    return <section className="arrivalInformation">
      <div className="container">
        <h1 className='title'>{this.state.arrivalsInformation[0].lineName} Line</h1>
        <h1 className='subtitle'>{this.state.arrivalsInformation[0].stationName}</h1>
        <div className="columns is-centered is-multiline is-mobile">
          {trains.map((train, index) => {
            return <div key={index} className="column is-half has-text-centered departureDisplay" >
              <h1 className='subtitle'>Destination: {train}</h1>
              {this.state.arrivalsInformation.map((arrival, index) => {
                console.log(arrival)
                if (arrival.destinationName === train) {
                  return <div className="column">


                    <ArrivalCard key={index} {...arrival} />


                  </div>
                }
              })
              }
            </div>




          })}

        </div>


      </div >
    </section >
  }





}