import React, { Component } from 'react';
import Sound from './Sound'
import Filter from './Filter'
import './Main.css'

const blankSynth = {}

class Main extends Component {
  constructor() {
    super()
    this.state = {
      totalSounds: [blankSynth]
    }
  }

  connectToMaster(synth) {
    synth.toMaster()
  }

  addSound(e) {
    this.setState({
      totalSounds: this.state.totalSounds.concat(blankSynth)
    })
  }

  render() {
    console.log(this.state.totalSounds)
    let synths = this.state.totalSounds.map((synth, index) => {
      return (
        <div className="synth" key={index}>
          <Sound
            index={index + 1}
            synth={synth}
            toneAmount={this.state.totalSounds}
            connectToMaster={(synth) => this.connectToMaster(synth)}
          />
        </div>
      )
    })
    return (
      <div>
        <button onClick={(e) => this.addSound(synths)}>Add Oscillator</button>
        <div className="synth-container">
          {synths}
        </div>
      </div>
    )
  }
}

export default Main;
