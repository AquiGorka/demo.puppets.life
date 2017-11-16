import React, { Component } from 'react'
import qr from 'qr-encode'
import GoogleURL from 'google-url'

const googleUrl = new GoogleURL({ key: GOOGLE_APIKEY })

class Connect extends Component {

  state = { link: null }

  async componentDidMount() {
    const signal = await this.props.peer.initiator()
    const url = document.location.origin + '/p'
    googleUrl.shorten(`${url}?signal=${btoa(JSON.stringify(signal))}`, (err, res) => {
      if (err) {
        console.log('Error: ', err)
      }
      this.setState({ link: res })
    })
  }

  render() {
    const { link } = this.state
    if (!link) {
      return <div>Loading</div>
    }

    return <div>
      <div>Follow the QR Code or the link with your smartphone:</div>
      <div>{qr(link, { type: 6, size: 6, level: 'Q'})}</div>
      <div>{link}</div>
    </div>
  }
}

export default Connect
