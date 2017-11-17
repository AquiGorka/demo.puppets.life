import React, { Component } from 'react'
import nsa from '../../../nsa'

class Simulation extends Component {

  componentDidMount() {
    nsa.on('data', this.onData)
  }

  componentWillUnmount() {
    nsa.off('data', this.onData)
  }

  onData = data => {
    console.log(data)
  }

  render() {
    return null
  }
}

export default Simulation
