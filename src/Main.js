import React, { Component } from 'react'
import Tone from 'tone'
import Sound from './Sound'
import Chorus from './Chorus'
import Distortion from './Distortion'
import './Main.css'

  var synthInit = new Tone.Synth({
    frequency: 400,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
  })

  var chorusInit = new Tone.Chorus(4, 2.5, 0.5)
  chorusInit.wet.value = 0

  var distortionInit = new Tone.BitCrusher(4)
  distortionInit.wet.value = 0

class Main extends Component {
  constructor() {
    super()
    this.state = {
      synths: [synthInit],
      distortions: [distortionInit],
      choruses: [chorusInit]
    }
  }

  connectToMaster(synth, chorus, distortion) {
    synth.chain(chorus, distortion, Tone.Master)
  }

  addSound() {
    var newSynth = new Tone.Synth({
      frequency: 440,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
    })

    var newChorus = new Tone.Chorus(9, 1);
    newChorus.wet.value = 0

    var newDist = new Tone.BitCrusher(4)
    newDist.wet.value = 0

    this.setState({
      synths: [...this.state.synths, newSynth],
      choruses: [...this.state.choruses, newChorus],
      distortions: [...this.state.distortions, newDist]
    })
  }

  render() {
    let synths = this.state.synths.map((synth, index) => {
      let chorus = this.state.choruses[index]
      let distortion = this.state.distortions[index]
      this.connectToMaster(synth, chorus, distortion)
      return (
        <div className="synth" key={index}>
          <Sound
            index={index + 1}
            synth={synth}
          />
          <Chorus
            index={index + 1}
            chorus={chorus}
          />
          <Distortion
            index={index + 1}
            distortion={this.state.distortions[index]}
          />
        </div>
      )
    })
    return (
      <div>
        <button className="add-oscillator" onClick={(e) => this.addSound()}>Add Oscillator</button>
        <div className="synth-container">
          {synths}
        </div>
      </div>
    )
  }
}

export default Main;
