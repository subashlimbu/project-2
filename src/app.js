import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './styles/style.scss'


import TubeLines from './components/TubeLines'
import LineStations from './components/LineStations'
import StationArrivals from './components/StationArrivals'
import Hero from './components/common/Hero'


const App = () => (
  <BrowserRouter basename="project-2">
    <Hero />

    <Switch>
      <Route exact path="/stations/:line/:id" component={StationArrivals} />
      <Route exact path="/" component={TubeLines} />
      <Route exact path="/linestations/:linename" component={LineStations} />


    </Switch>
  </BrowserRouter>



)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)