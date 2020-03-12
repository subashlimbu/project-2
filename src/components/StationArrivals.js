import React from 'react'
import axios from 'axios'


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


  render() {
    if (!this.state.arrivalsInformation) return <p>Waiting for Data</p>

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
            return <div key={index} className="column is-one-quarter has-text-centered" >
              <p>{platform}</p>
              {this.state.arrivalsInformation.map(arrival => {
                if (arrival.platformName === platform) {
                  return <div className="column">

                    <p>{arrival.destinationName}</p>
                    <p>{arrival.timeToStation}</p>


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