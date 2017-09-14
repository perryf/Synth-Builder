import React, { Component } from 'react'
import Tone from 'tone'
import Sound from './Sound'
import Filter from './Filter'
import './Main.css'

  var synthInit = new Tone.Synth({
    frequency: 440,
    oscillator: {
      type: 'sine'
      // modulationType: 'sine1',
      // modulationIndex: 3,
      // harmonicity: 3.4,
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1
    }
  })

class Main extends Component {
  constructor() {
    super()
    this.state = {
      totalSounds: [synthInit]
    }
  }

  connectToMaster(synth) {
    synth.toMaster()
  }

  addSound(e) {
    this.setState({
      totalSounds: this.state.totalSounds.concat(synthInit)
    })
  }

  render() {
    // console.log(this.state.totalSounds)
    let synths = this.state.totalSounds.map((synth, index) => {
      this.connectToMaster(synth)
      return (
        <div className="synth" key={index}>
          <Sound
            index={index + 1}
            synth={synth}
            // toneAmount={this.state.totalSounds}
            // connectToMaster={(synth) => this.connectToMaster(synth)}
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
