import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchBar from './common/SearchBar'
import LoaderSpinner from './common/LoaderSpinner'

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


class TubeLines extends React.Component {

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
    if (!this.state.lineData) return <LoaderSpinner />
    return <section className="section">
      <SearchBar query={this.state.query} onChange={() => this.filterTheLines(event)} />
      <div className="container">
        <div className="columns is-centered is-multiline is-mobile">

          <div className="column is-two-thirds has-text-centered">
            {this.state.filteredLines.map((line, index) => {
              return <Link
                key={index}
                className='lineBox'
                to={`/linestations/${line.id}`}
                style={{ backgroundColor: hexForTubeLines[line.name] }}>
                <h2 className="lineName">{line.name}</h2>
                <p className="lineStatus">{line.lineStatuses[0].statusSeverityDescription}</p>
              </Link>

            })}
          </div>
        </div>
      </div>
    </section>
  }

}
export default TubeLines
