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
  
    this.updataData()
  }

  updataData() {

    setInterval(() => {
      const id = this.props.match.params.id
      const line = this.props.match.params.line
      axios.get(`https://api.tfl.gov.uk/Line/${line}/Arrivals/${id}`)
        .then(res => this.setState({ arrivalsInformation: res.data }))
        .catch(err => console.error(err))
      console.log('Hello')

    }, 10000)
  }
  
  handleLogout() {
    this.props.history.push('/')
  }

  sortArrivalsInformation() {
    const newArrivalInfo = { ...this.state.arrivalsInformation }
    newArrivalInfo.sort(function (a, b) {
      return parseInt(a.timeToStation) - parseInt(b.timeToStation)
    })
    console.log(newArrivalInfo)

    this.setState({ arrivalsInformation: newArrivalInfo })
  }

  render() {
    
    if (!this.state.arrivalsInformation) return <LoaderSpinner />

    console.log(this.state.arrivalsInformation)

    const platforms = []
    const trains = []
    this.state.arrivalsInformation.map((arrival) => {
      if (!trains.includes(arrival.destinationName)) {
        trains.push(arrival.destinationName)
      }
      if (!platforms.includes(arrival.platformName)) {
        platforms.push(arrival.platformName)
      }
    })


    return <section className="arrivalInformation">
      <button
        onClick={() => this.handleLogout()}
        className="navbar-item"
      >
        Home
      </button>
      <div className="container">
        <h1 className='title has-text-centered'>{this.state.arrivalsInformation[0].lineName} Line</h1>
        <h1 className='subtitle has-text-centered'>{this.state.arrivalsInformation[0].stationName}</h1>
        <div className="columns is-centered is-multiline is-mobile">
          {platforms.map((platform, index) => {
            return <div key={index} className="column is-half has-text-centered departureDisplay" >
              <h1 className='subtitle'>{platform}</h1>
              {this.state.arrivalsInformation.map((arrival, index) => {
                if (arrival.platformName === platform && arrival.destinationName !== arrival.stationName) {
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