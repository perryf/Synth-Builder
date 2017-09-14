import React, { Component } from 'react'

class Lfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lfo: this.props.lfo
    }
  }

  //phase, frequency, amplitude

  render () {
    return (
      <div className="lfo">
        <h1>LFO</h1>
      </div>
    )
  }
}

export default Lfo
