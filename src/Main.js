import React, { Component } from 'react'
import Tone from 'tone'
import Sound from './Sound'
import Lfo from './Lfo'
import Chorus from './Chorus'
import Distortion from './Distortion'
import './Main.css'

  var synthInit = new Tone.Synth({
    frequency: 400,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
  })

  var lfoInit = new Tone.AutoFilter(200, 100, 2.6).start()
  lfoInit.wet.value = 0

  var chorusInit = new Tone.Chorus(4, 2.5, 0.5)
  chorusInit.wet.value = 0

  var distortionInit = new Tone.BitCrusher(4)
  distortionInit.wet.value = 0

  var colorInit = function() {
    let palette = '789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += palette[Math.floor(Math.random() * 9)]
    }
    return color
  }

class Main extends Component {
  constructor() {
    super()
    this.state = {
      synths: [synthInit],
      lfos: [lfoInit],
      choruses: [chorusInit],
      distortions: [distortionInit],
      colors: [colorInit()]
    }
  }

  connectToMaster(synth, lfo, chorus, distortion) {
    synth.chain(lfo, chorus, distortion, Tone.Master)
  }

  addSound() {
    var newSynth = new Tone.Synth({
      frequency: 440,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
    })

    var newLfo = new Tone.AutoFilter(200, 100, 2.6).start()
    newLfo.wet.value = 0

    var newChorus = new Tone.Chorus(9, 1);
    newChorus.wet.value = 0

    var newDist = new Tone.BitCrusher(4)
    newDist.wet.value = 0

    var newColor = colorInit()

    this.setState({
      synths: [...this.state.synths, newSynth],
      lfos: [...this.state.lfos, newLfo],
      choruses: [...this.state.choruses, newChorus],
      distortions: [...this.state.distortions, newDist],
      colors: [...this.state.colors, newColor]
    })
  }

  render() {
    let synths = this.state.synths.map((synth, index) => {
      let lfo = this.state.lfos[index]
      let chorus = this.state.choruses[index]
      let distortion = this.state.distortions[index]
      let color = this.state.colors[index]
      this.connectToMaster(synth, lfo, chorus, distortion)
      return (
        <div className="synth" key={index} style={{background: color}}>
          <Sound
            index={index + 1}
            synth={synth}
          />
          <Lfo
            lfo={lfo}
          />
          <Chorus
            chorus={chorus}
          />
          <Distortion
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
