import React, { Component } from 'react'
import update from 'immutability-helper'
import Tone from 'tone'
import Sound from './Sound'
import Distortion from './Distortion'
import './Main.css'

  var synthInit = new Tone.Synth({
    frequency: 440,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
  })

  var distortionInit = new Tone.BitCrusher(4)
  distortionInit.toggle = null

class Main extends Component {
  constructor() {
    super()
    this.state = {
      synths: [synthInit],
      distortion: [distortionInit]
    }
  }

  connectToMaster(synth, distortion) {
    if (distortion.toggle) {
      synth.connect(distortion)
      distortion.toMaster()
    } else if (distortion.toggle === false) {
      synth.disconnect(distortion)
      synth.toMaster()
    }
    else {
      synth.toMaster()
    }
  }

  addSound() {
    let newSynth = new Tone.Synth({
      frequency: 440,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
    })

    let newDist = new Tone.BitCrusher(4)
    distortionInit.toggle = null

    this.setState({
      synths: this.state.synths.concat(newSynth),
      distortion: this.state.distortion.concat(newDist)
    })
  }

  distToggleHandler(e, distortion, index) {
    let value = e.target.checked
    let newDistortion = update(this.state.distortion[index], {toggle: {$set: value}})
    let newDistortionArray = update(this.state.distortion, {$splice: [[index, 1, newDistortion]]})
    console.log(this.state.distortion)
    this.setState({
      distortion: newDistortionArray
    })
  }

  render() {
    let synths = this.state.synths.map((synth, index) => {
      let distortion = this.state.distortion[index]
      this.connectToMaster(synth, distortion)
      return (
        <div className="synth" key={index}>
          <Sound
            index={index + 1}
            synth={synth}
          />
          <label>
            Distortion Toggle
            <input type="checkbox" onClick={(e) => this.distToggleHandler(e, distortion, index)}></input>
          </label>
          <Distortion
            index={index + 1}
            distortion={this.state.distortion[index]}
          />
        </div>
      )
    })
    return (
      <div>
        <button onClick={(e) => this.addSound()}>Add Oscillator</button>
        <div className="synth-container">
          {synths}
        </div>
      </div>
    )
  }
}

export default Main;
