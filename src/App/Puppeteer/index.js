import React, { Component } from 'react'
import GoogleURL from 'google-url'
import qmark from 'qmark'
import nsa from '../../nsa'

const googleUrl = new GoogleURL({ key: GOOGLE_APIKEY })
const PUPPETEER = 'p2p connected, start sending gyro data'
const CONNECT = 'waiting for connection'

const Controls = () => <div>C</div>

class Puppeteer extends Component {
  constructor(props) {
    super(props)
    this.state = { mode: null, id: null }
  }

  async componentDidMount() {
    const signal = atob(qmark('signal'))
    if (signal) {
      const data = await nsa.signal(signal)
      googleUrl.shorten(`${location.origin}${location.pathname}?signal=${btoa(JSON.stringify(data))}`, (err, shortUrl) => {
        if (err) {
          console.log(err)
        }
        // remove the length of https://goo.gl/
        const id = shortUrl.substr(15)
        //console.log(id)
        this.setState({  mode: CONNECT, id  })
      })
    }
    nsa.on('connect', () => this.setState({ mode: PUPPETEER }))
  }

  render() {
    const { mode, id } = this.state

    if (mode === PUPPETEER) {
      return <Controls />
    }

    if (mode === CONNECT) {
      return <div>{id}</div>
    }

    return <div>Please provide the correct information</div>
  }
}

export default Puppeteer
