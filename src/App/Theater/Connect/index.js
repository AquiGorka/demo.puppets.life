import React, { Component } from 'react'
import qr from 'qr-encode'
import GoogleURL from 'google-url'
import nsa from '../../../nsa'

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
      return <div>Loading</div>
    }

    return <div>
      <div>Follow the QR Code or the link with your smartphone:</div>
      <div><img src={qr(link, { type: 6, size: 6, level: 'Q'})} /></div>
      <div>{link}</div>
      <form onSubmit={this.onSubmit} ref={f => (this.form = f)}>
        <input type="text" />
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
