import React from 'react'
import axios from 'axios'
import StationCard from './StationCard'
import SearchBar from './common/SearchBar'
import StationInformation from './common/StationInformation'

import LoaderSpinner from './common/LoaderSpinner'


class LineStations extends React.Component {

  constructor() {
    super()
    this.state = {
      lineStations: null,
      filteredStations: null,
      query: '',
      modal: false,
      singleLineStation: {}
    }
  }

  componentDidMount() {
    const lineId = this.props.match.params.linename
    axios.get(`https://api.tfl.gov.uk/Line/${lineId}/StopPoints?tflOperatedNationalRailStationsOnly=false`)
      .then(res => this.setState({
        lineStations: res.data,
        filteredStations: res.data
      })
      )
      .catch(err => console.error(err))

    this.updataData()
  }


  updataData() {

    setInterval(() => {
      const lineId = this.props.match.params.linename
      axios.get(`https://api.tfl.gov.uk/Line/${lineId}/StopPoints?tflOperatedNationalRailStationsOnly=false`)
        .then(res => this.setState({
          lineStations: res.data,
          filteredStations: res.data
        })
        )
        .catch(err => console.error(err))
    }, 20000)




  }


  filterTheStations(event) {
    console.log(event.target.value)
    const searchQuery = event.target.value

    const filteredStations = this.state.lineStations.filter((station) => {
      const regex = new RegExp(searchQuery, 'i')
      return station.commonName.match(regex)
    })

    console.log(filteredStations)
    this.setState({
      filteredStations,
      query: searchQuery
    })


  }

  handleClick(station) {
    this.setState({ singleLineStation: station })
    this.toggleModal()
  }
  toggleModal() {
    const tempModal = !this.state.modal
    this.setState({ modal: tempModal })
  }


  render() {
    const lineId = this.props.match.params.linename
    console.log(this.state.lineStations)
    if (!this.state.lineStations) return <LoaderSpinner />
    return <section className="stationsIndex">
      <div className="section">
        <SearchBar query={this.state.query} onChange={() => this.filterTheStations(event)} />
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {this.state.filteredStations.map((station, index) => {
              return <StationCard key={index} {...station} lineId={lineId} handleClick={() => this.handleClick(station)}>
              </StationCard>
            })}
          </div>
        </div>
      </div>
      {this.state.modal ? <StationInformation station={this.state.singleLineStation} toggleModal={() => this.toggleModal()} /> : null}
    </section>
  }
}
export default LineStations