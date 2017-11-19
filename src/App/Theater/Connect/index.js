import React, { Component } from 'react'
import qr from 'qr-encode'
import GoogleURL from 'google-url'
import nsa from '../../../nsa'
import './Connect.css'

const googleUrl = new GoogleURL({ key: GOOGLE_APIKEY })

class Connect extends Component {

  state = { link: null }

  async componentDidMount() {
    const signal = await nsa.initiator()
    const url = (PUPPETEER_URL ? PUPPETEER_URL : document.location.origin) + '/p'
    googleUrl.shorten(`${url}?signal=${btoa(JSON.stringify(signal))}`, (err, res) => {
      if (err) {
        console.log('Error: ', err)
      }
      this.setState({ link: res })
    })
    nsa.on('connect', this.props.onConnect)
  }

  render() {
    const { link } = this.state
    if (!link) {
      return <div className="connect__loading"></div>
    }

    return <div className="connect">
      <h2>Follow the QR Code or the link with your smartphone and then connect using the provided Id:</h2>
      <div className="connect__qr">
        <img alt="Puppeteer" src={qr(link, { type: 6, size: 4, level: 'Q'})} />
      </div>
      <div className="connect__link">{link}</div>
      <form onSubmit={this.onSubmit} ref={f => (this.form = f)}>
        <input className="connect__input-id" type="text" placeholder="Id here" />
        <button className="connect__input-submit" type="submit">Connect</button>
      </form>
    </div>
  }

  onSubmit = e => {
    e.preventDefault()
    const id = this.form.elements[0].value
    googleUrl.expand(`https://goo.gl/${id}`, (err, longUrl) => {
      //console.log(longUrl)
      const data = JSON.parse(atob(longUrl.split('?signal=')[1]))
      nsa.connect(data)
    })
  }
}

export default Connect
