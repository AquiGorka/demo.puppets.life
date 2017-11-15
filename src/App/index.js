import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Home from './Home'
import Theater from './Theater'
import Puppeteer from './Puppeteer'

class App extends Component {
  render() {
    return <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/t" component={Theater} />
        <Route path="/p" component={Puppeteer} />
      </Switch>
  </Router>
  }
}

export default App
