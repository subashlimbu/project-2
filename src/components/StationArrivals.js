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
    return <section className="arrivalInformation">
      <div className="container">
        <div className="columns is-centered is-multiline is-mobile">


          <div className="column is-half has-text-centered">
            {this.state.arrivalsInformation.map((arrival, index) => {
              return <>
                  <p key={index}> {arrival.destinationName} </p>
                  <p> {arrival.platformName}</p>
                <p>Time To Station: {arrival.timeToStation} Seconds</p>
              </>
            })}
          </div>
        </div>

      </div>
    </section>
  }





}