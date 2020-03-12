import React from 'react'
import axios from 'axios'
import LoaderSpinner from './common/LoaderSpinner'
import ArrivalCard from './ArrivalCard'


export default class SataionArrival extends React.Component {

  constructor() {
    super()
    this.state = {
      arrivalsInformation: null
    }
  }


  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`https://api.tfl.gov.uk/StopPoint/${id}/arrivals`)
      .then(res => this.setState({ arrivalsInformation: res.data }))
      .catch(err => console.error(err))

  }
  sortArrivalsInformation(info) {
    info.sort(function (a, b) {
      return parseInt(a.timeToStation) - parseInt(b.timeToStation)
    })
  }


  render() {
    if (!this.state.arrivalsInformation) return <LoaderSpinner />

    console.log(this.state.arrivalsInformation)
    const platformNames = []
    this.state.arrivalsInformation.map((arrival) => {
      if (!platformNames.includes(arrival.platformName)) {
        platformNames.push(arrival.platformName)
      }
    })

    return <section className="arrivalInformation">
      <div className="container">
        <div className="columns is-centered is-multiline is-mobile">
          {/* <div className="column is-half has-text-centered"> */}
          {platformNames.map((platform, index) => {
            return <div key={index} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile has-text-centered" >
              <h2 className='title'>{platform}</h2>
              {this.state.arrivalsInformation.map((arrival, index) => {
                console.log(arrival)
                if (arrival.platformName === platform) {
                  return <div className="column">

                    <ArrivalCard key={index} {...arrival} />


                  </div>
                }
              })}
            </div>
          })}

        </div>
        {/* </div> */}

      </div>
    </section>
  }





}