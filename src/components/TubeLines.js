import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default class TubeLines extends React.Component {

  constructor() {
    super()
    this.state = {
      lineData: null

    }
  }

  componentDidMount() {
    axios.get('https://api.tfl.gov.uk/Line/Mode/tube/Status?detail=true')
      .then(res => this.setState({ lineData: res.data }))
      .catch(err => console.error(err))

  }

  render() {
    console.log(this.state.lineData)
    if (!this.state.lineData) return <p>Waiting for Data</p>
    return <section className="section">
      <div className="container">
        <div className="columns is-centered is-multiline is-mobile">

          <div className="column is-half has-text-centered">
            {this.state.lineData.map((line, index) => {
              return <div key={index} className='lineBox'>
                <Link to={`/linestations/${line.id}`}>
                  <h2 className="lineName">{line.name}</h2>
                  <p className="lineStatus">{line.lineStatuses[0].statusSeverityDescription}</p>
                </Link>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>
  }

}
