import React, { Component } from 'react'
import Tone from 'tone'
import Sound from './Sound'
import Distortion from './Distortion'
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

  var distortion = new Tone.BitCrusher(4)

class Main extends Component {
  constructor() {
    super()
    this.state = {
      totalSounds: [synthInit],
      distortionToggle: null
    }
  }

  connectToMaster(synth) {
    console.log('')
    if (this.state.distortionToggle) {
      synth.connect(distortion)
      distortion.toMaster()
    } else if (this.state.distortionToggle === false) {
      synth.disconnect(distortion)
      synth.toMaster()
    }
    else {
      synth.toMaster()
    }
  }

  addSound(e) {
    this.setState({
      totalSounds: this.state.totalSounds.concat(synthInit)
    })
  }

  distToggleHandler(e) {
    console.log(e.target.checked)
    this.setState({
      distortionToggle: e.target.checked
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
          <label>
            Distortion Toggle
            <input type="checkbox" onClick={(e) => this.distToggleHandler(e)}></input>
          </label>
          <Distortion
            distortion={distortion}
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
