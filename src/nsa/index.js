import Peer from 'simple-peer'
import EventEmitter from 'events'

class NSA extends EventEmitter {
  constructor() {
    super()
    this.peer = null
  }

  initiator() {
    return new Promise((resolve, reject) => {
      this.peer = new Peer({ initiator: true, trickle: false })
      this.peer.on('signal', resolve)
      this.peer.on('connect', () => this.emit('connect'))
      this.peer.on('data', () => this.emit('data', JSON.parse(data)))
    })
  }

  connect(data) {
    if (!peer) {
      throw new Error('Please use initiator or sginal')
    }
    peer.signal(data)
  }

  signal(data) {}
}

export default new NSA()
