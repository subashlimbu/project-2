### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# project-2 "TFL Travel"

# Timeframe: 2 days

## Technologies used 

- HTML5
- SCSS
- JavaScript(ES6)
- Bulma
- Axios
- React.js
- Webpack
- TFL API
- Git and GitHub


# *TFL Travel*

## Overview

TFL Travel is project built in 48 hour. It is a multiple-page website using React which consumes a public API. 

This was a pair programming task which displays the tube line status and all the stations served in that line. It also shows the information about the services provided at that particular tube line and its arrival time towards each directions.

Visit TFL Line Status [here](https://github.com/subashlimbu/project-2) 


## The Brief 

- **Consume a public API**
- **Have several components**
- **The app should include a router - with several "pages"**
- Use **semantic markup** for HTML and CSS (adhere to best practices)
- **Deploy your app online**, where the rest of the world can access it



## The Approach

### The Router

The app is utilises the React Router `<BrowserRouter>` to keep the UI in sync with the URL.

 ```js
 import { BrowserRouter, Switch, Route } from 'react-router-dom'

 const App = () => (
  <BrowserRouter>
    <Hero />
    <Switch>
      <Route exact path="/stations/:line/:id" component={StationArrivals} />
      <Route exact path="/" component={TubeLines} />
      <Route exact path="/linestations/:linename" component={LineStations} />
    </Switch>
  </BrowserRouter>
)
 ```
<img  src=src/images/Home.png width=500>
 
 
### The SearchBar

The SearchBar takes text input from the user which handles the change and filters the tube line. If nothing matches, it displays nothing.

```js
const SearchBar = ({ query, onChange }) => {

  return <div className="search">
    <div className="field">
      <div className="control">
        <input
          className="input is-info"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={onChange}>
        </input>
      </div>
    </div>
  </div >
}

export default SearchBar
```

filteredLines are initially set to null. Then make a call to the TFL API using `Axios`

```js
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
```
We then mapped through the lineData to match the text typed in the SearchBar and filter down the lines. Then set the state as filteredLines. 

```js
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
  ```
Here is how the page renders when the user searches for a tube line in the search bar:

<img src=src/images/Search.png width=500>

### LoaderSpinner

If the data from the API has yet to return and be set in state, then an image is displayed in the render to indicate loading:

```js
 render() {
    if (!this.state.lineData) return <LoaderSpinner />
```
### TubeLines

We set the colour for each tube lines to display. Then map through the filteredLines to display all the station served with that line.

```js
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
```

### StationArrivals

This is a class component which shows the arrival information of the tube line in a particular station. It displays how long the tube is due to arrive at that station. We fetch the data from the API using the unique id of the sation. 


```js
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
  
    this.updataData()
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
              })}
              </div>
          })}
        </div>
      </div >
    </section >
  }
}
```

The arrival card is updated every 10 seconds using the setInterval() function so that the user gets to see the updated arrival time helping them to plan their journey better.

```js
updataData() {

    setInterval(() => {
      const id = this.props.match.params.id
      const line = this.props.match.params.line
      axios.get(`https://api.tfl.gov.uk/Line/${line}/Arrivals/${id}`)
        .then(res => this.setState({ arrivalsInformation: res.data }))
        .catch(err => console.error(err))

    }, 10000)
}
```
<img src=src/images/StationArrivals.png width=500>

### Functional Components and Styling

Functional components such as `ArrivalCard` and `StationCard` are used to render the information from the API in a visually pleasing way. We used the Bulma CSS Framework to keep our layout simple, clean and easily suitable for mobile use.

### StationCard

We used pop() method to remove the "underground station" since it was taking lots of space in the card. It has arrival time and station information that a user can select. 


 ```js
  const StationCard = ({ commonName, id, handleClick, lineId }) => {

  const myCommonName = commonName.split(' ')
  myCommonName.pop()
  myCommonName.pop()
  const newCommonName = myCommonName.join(' ')

  return <div className='column is-two-quarter'>
    <Link to={`/stations/${lineId}/${id}`}></Link>
    <div className="card">
      <div className="card-content">
        <div className="title">
          <h4 className="card-title">{newCommonName}</h4>
        </div>
        <div className="subtitle">
    
        </div>
      </div>
      <footer className="card-footer">
        <div className='button'><Link className='myLink' to={`/stations/${lineId}/${id}`}>Arrivals:</Link></div>
       
        <div className="button" onClick={() => handleClick()}>Station Information</div>
    
      </footer>
    </div>
  </div>
}
export default StationCard
 ```
<img src=src/images/Stations.png width=500>

### ArrivalCard

This card displays the destination name and the arrival time. 

```js
import React from 'react'

const ArrivalCard = (arrival) => {

  return <div className="arrivalBox">
   
    <p className='dest'> <span className='destSpan'>{arrival.destinationName}</span></p>
    <p className='time'>: {Math.floor(parseInt(arrival.timeToStation) / 60)} minutes</p>
    
  </div>
}

export default ArrivalCard
```

### Station Information

This component displays the services provided at the tube station. I used Bulma Modal to display. 

```js
import React from 'react'
const StationInformation = ({ station,  toggleModal }) => {
  console.log(station)
  return <div className="modal is-active">
    <div className="modal-background" onClick={() => toggleModal()}></div>
    <div className="modal-content ">
      {/* <p>{station.commonName}</p> */}
      {station.additionalProperties.map(property => {
        return <>
        {(!(property.category === 'NearestPlaces')) && <div className="column is-half is-centered is-multiline"> {property.key}</div>}
        </>
      })}
    </div>
    <button className="modal-close is-large" aria-label="close"></button>
  </div>
}
export default StationInformation
 ```
<img src=src/images/Modal.png width=500>

 
## Challenges

- This was our first project using React that utilised multiple components and routing. Understanding how to pass props between components took a little time for us to get to grips with.

- Using Modal to display the information was tricky. Spent lot of time learning the logic.


## Wins 
- My first experience of Pair programming is something I particularly enjoyed. The spirit of collaboration and comporomise made this a really fun project to work on and I'm proud of the finished product given that it was our first time-limited 'hackathon'. 

## Key learnings
- First experience of Pair Programming.
- How to successfully update the state with setState and also update the lifecycle of the component using componentDidUpdate()
- Pass props between React Components.

## Potential future features
- Due to the time constraints, the CSS design is plain. I would work on the designing part as a futute feature. 

- Also in Arrival Information page, the time is not sorted in ascending order which I would implement in future.