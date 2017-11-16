import React, { Component } from 'react'
import Connect from './Connect'
import Simulation from './Simulation'
import peer from '../../nsa'

const CONNECT = 'provide the user with the url to open on their phone and the input to receive their id'
const SIMULATION = 'run the 3D simulation'

class Theater extends Component {

  state = { mode: CONNECT }

  render() {
    if (this.state.mode === CONNECT) {
      return <Connect peer={peer} onConnect={() => this.setState({ mode: Simulation })} />
    }

    return <Simulation peer={peer} onDisconnect={() => this.setState({ mode: CONNECT })} />
  }
}

export default Theater
