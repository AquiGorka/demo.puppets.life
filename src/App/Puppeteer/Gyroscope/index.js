import React, { Component } from 'react'
import throttle from 'method-throttle'
import nsa from '../../../nsa'

class Gyroscope extends Component {

  componentDidMount() {
    window.addEventListener("deviceorientation", this.onOrientation, true)
  }

  componentWillUnmount() {
    window.removeEventListener("deviceorientation", this.onOrientation)
  }

  onOrientation = throttle(({ alpha, beta, gamma }) => {
    nsa.send({ orientation: { alpha, beta, gamma }})
  }, 50)

  render() {
    return <div></div>
  }
}

export default Gyroscope
