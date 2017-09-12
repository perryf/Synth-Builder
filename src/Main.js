import React, { Component } from 'react';
import './Main.css';
import Sound from './Sound'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      totalSounds: ['synth'],
      synth: {}
    }
  }

  connectToMaster(synth) {
    synth.toMaster()
  }

  addSound(e) {
    this.setState({
      totalSounds: this.state.totalSounds.concat('synth')
    })
  }

  render() {
    let synths = this.state.totalSounds.map((e, index) => {
      return (
        <Sound
          key={index}
          index={index + 1}
          synth={this.state.synth}
          toneAmount={this.state.totalSounds}
          connectToMaster={(e) => this.connectToMaster(e)}
        />
      )
    })
    return (
      <div>
        {synths}
        <button onClick={(e) => this.addSound(e)}>Add Oscillator</button>
      </div>
    )
  }
}

export default Main;
