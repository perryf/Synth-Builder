import React, { Component } from 'react'
import update from 'immutability-helper'
import Tone from 'tone'
import Sound from './Sound'
import Lfo from './Lfo'
import Distortion from './Distortion'
import './Main.css'

  var synthInit = new Tone.Synth({
    frequency: 440,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
  })

  // var lfoInit = new Tone.LFO(1, 400, 4000);
  // lfoInit.toggle = null
  // lfo.connect(filter.frequency);

  var distortionInit = new Tone.BitCrusher(4)
  distortionInit.toggle = null

class Main extends Component {
  constructor() {
    super()
    this.state = {
      synths: [synthInit],
      distortion: [distortionInit]
      // lfo: [lfoInit]
    }
  }

  connectToMaster(synth, distortion) {
    if (distortion.toggle === true) {
      synth.connect(distortion)
      distortion.toMaster()
    } else if (distortion.toggle === false) {
      distortion.disconnect()
      synth.toMaster()
    }
    else {
      synth.toMaster()
    }

  }

  addSound() {
    var newSynth = new Tone.Synth({
      frequency: 440,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
    })

    var newDist = new Tone.BitCrusher(4)
    newDist.toggle = null

    // let newSynthArray = (this.state.synths, {$push: [newSynth]})
    //
    // this.setState({
    //   synths: this.state.synths.concat(newSynth),
    //   distortion: this.state.distortion.concat(newDist)
    // })
    this.setState({
      synths: [...this.state.synths, newSynth],
      distortion: [...this.state.distortion, newDist]
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
      // let lfo = this.state.lfo[index]
      let distortion = this.state.distortion[index]
      this.connectToMaster(synth, distortion)
      console.log(this.state.synths)
      console.log(this.state.distortion)
      return (
        <div className="synth" key={index}>
          <Sound
            index={index + 1}
            synth={synth}
          />
          {/* <Lfo
            index={index + 1}
            lfo={lfo}
          /> */}
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
