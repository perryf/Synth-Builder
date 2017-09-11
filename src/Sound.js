import React, { Component } from 'react'
import Tone from 'tone'

class Sound extends Component {
  render() {
    var synth = new Tone.Synth().toMaster()
    synth.triggerAttackRelease('C4', '8n')
    
    return(
      <div>
        <h1>Hi there</h1>
        <p>{this.props.toneAmount}</p>

      </div>
    )
  }
}

export default Sound
