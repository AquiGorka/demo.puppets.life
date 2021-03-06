import React, { Component } from 'react'
import GoogleURL from 'google-url'
import qmark from 'qmark'
import Gyroscope from './Gyroscope'
import nsa from '../../nsa'
import './Puppeteer.css'

const googleUrl = new GoogleURL({ key: GOOGLE_APIKEY })
const PUPPETEER = 'p2p connected, start sending gyro data'
const CONNECT = 'waiting for connection'


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
    nsa.on('close', () => this.setState({ mode: CONNECT }))
  }

  render() {
    const { mode, id } = this.state

    if (mode === PUPPETEER) {
      return <Gyroscope />
    }

    if (mode === CONNECT) {
      return <div className="puppeteer__wrap">
        <h2>Use this Id to connect:</h2>
        <div className="puppeteer__id">{id}</div>
      </div>
    }

    return <div className="puppeteer"></div>
  }
}

export default Puppeteer
