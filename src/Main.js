import React, { Component } from 'react'
import update from 'immutability-helper'
import Tone from 'tone'
import Sound from './Sound'
import Tremolo from './Tremolo'
import Distortion from './Distortion'
import './Main.css'

  var synthInit = new Tone.Synth({
    frequency: 440,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
  })

  var tremoloInit = new Tone.Chorus(4, 2.5, 0.5)
  tremoloInit.toggle = null
  tremoloInit.wet.value = 0

  var distortionInit = new Tone.BitCrusher(4)
  distortionInit.toggle = null
  distortionInit.wet.value = 0

class Main extends Component {
  constructor() {
    super()
    this.state = {
      synths: [synthInit],
      distortions: [distortionInit],
      tremolos: [tremoloInit]
    }
  }

  // connectToMaster(synth, tremolo, distortion) {
  //   if (tremolo.toggle && distortion.toggle) {
  //     distortion.dispose()
  //     tremolo.dispose()
  //     // distortion.toMaster()
  //     console.log('test')
  //     synth.chain(tremolo, distortion, Tone.Master)
  //   } else if (tremolo.toggle === true && distortion.toggle === false) {
  //     distortion.disconnect()
  //     // synth.toMaster()
  //     synth.chain(tremolo, Tone.Master)
  //   } else if (tremolo.toggle === false && distortion === true) {
  //     tremolo.disconnect()
  //     // synth.toMaster()
  //     synth.chain(distortion, Tone.Master)
  //   }
  //   else {
  //     synth.toMaster()
  //   }
  // }

  connectToMaster(synth, tremolo, distortion) {
    synth.chain(tremolo, distortion, Tone.Master)
  }

  addSound() {
    var newSynth = new Tone.Synth({
      frequency: 440,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
    })

    var newTremolo = new Tone.Chorus(9, 1);
    newTremolo.toggle = null
    newTremolo.wet.value = 0

    var newDist = new Tone.BitCrusher(4)
    newDist.toggle = null
    newDist.wet.value = 0

    this.setState({
      synths: [...this.state.synths, newSynth],
      tremolos: [...this.state.tremolos, newTremolo],
      distortions: [...this.state.distortions, newDist]
    })
  }

  tremoloToggleHandler(e, distortion, index) {
    let value = e.target.checked
    let newTremolo = update(this.state.tremolos[index], {toggle: {$set: value}})
    let newTremoloArray = update(this.state.tremolos, {$splice: [[index, 1, newTremolo]]})
    this.setState({
      tremolos: newTremoloArray
    })
  }

  distToggleHandler(e, distortion, index) {
    let value = e.target.checked
    let newDistortion = update(this.state.distortions[index], {toggle: {$set: value}})
    let newDistortionArray = update(this.state.distortions, {$splice: [[index, 1, newDistortion]]})
    this.setState({
      distortions: newDistortionArray
    })
  }

  render() {
    let synths = this.state.synths.map((synth, index) => {
      let tremolo = this.state.tremolos[index]
      let distortion = this.state.distortions[index]
      console.log(this.state.tremolos)
      console.log(distortion)
      this.connectToMaster(synth, tremolo, distortion)
      return (
        <div className="synth" key={index}>
          <Sound
            index={index + 1}
            synth={synth}
          />
          <label>
            Tremolo Toggle
            <input type="checkbox" onClick={(e) => this.tremoloToggleHandler(e, tremolo, index)}></input>
          </label>
          <Tremolo
            index={index + 1}
            tremolo={tremolo}
          />
          <label>
            Distortion Toggle
            <input type="checkbox" onClick={(e) => this.distToggleHandler(e, distortion, index)}></input>
          </label>
          <Distortion
            index={index + 1}
            distortion={this.state.distortions[index]}
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
