import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchBar from './common/SearchBar'

const hexForTubeLines = {
  'Bakerloo': '#996633',
  'Central': '#CC3333',
  'Circle': '#FFCC00',
  'District': '#006633',
  'Hammersmith & City': '#CC9999',
  'Jubilee': '#868F98',
  'Metropolitan': '#660066',
  'Northern': '#000000',
  'Piccadilly': '#0019a8',
  'Victoria': '#0099CC',
  'Waterloo & City': '#66CCCC'
}


export default class TubeLines extends React.Component {

  constructor() {
    super()
    this.state = {
      lineData: null,
      filteredLines: null,
      query: ''

    }
  }

  componentDidMount() {
    axios.get('https://api.tfl.gov.uk/Line/Mode/tube/Status?detail=true')
      .then(res => this.setState({ 
        lineData: res.data,
        filteredLines: res.data
      }))
      .catch(err => console.error(err))

  }

  filterTheLines(event) {

    const searchQuery = event.target.value
    const filteredLines = this.state.lineData.filter((line) => {
      const regex = new RegExp(searchQuery, 'i')
      return line.name.match(regex)
    })

    this.setState({
      filteredLines,
      query: searchQuery
    })


  }

  render() {
    console.log(this.state.lineData)
    if (!this.state.lineData) return <p>Waiting for Data</p>
    return <section className="section">
      <SearchBar query={this.state.query} onChange={() => this.filterTheLines(event)} />
      <div className="container">
        <div className="columns is-centered is-multiline is-mobile">

          <div className="column is-half has-text-centered">
            {this.state.filteredLines.map((line, index) => {
              return <div key={index} className='lineBox' style={{ backgroundColor: hexForTubeLines[line.name] }}>
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
