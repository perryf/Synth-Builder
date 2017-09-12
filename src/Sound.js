import React, { Component } from 'react'
import Tone from 'tone'
import './Sound.css'

class Sound extends Component {
  constructor(props) {
    super(props)
    this.state = {
      synth: this.props.synth
    }
    this.changeWave = this.changeWave.bind(this)
    this.changePartial = this.changePartial.bind(this)
  }
  componentWillMount() {
    var synth = new Tone.Synth({
      oscillator: {
        type: 'sine',
        modulationType: 'sine1',
        modulationIndex: 3,
        harmonicity: 3.4,
        frequency: 440
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.1,
        release: 0.1
      },
    })
    this.props.connectToMaster(synth)
    synth.playing = false

    this.setState({
      synth: synth
    })
  }

  startStop() {
    let synth = this.state.synth
    if (synth.playing === false) {
      synth.playing = true
      this.setState({
        synth: synth
      })
      synth.triggerAttack(synth.oscillator.frequency.value, '+0.05')
    } else {
      synth.playing = false
      this.setState({
        synth: synth
      })
      synth.triggerRelease()
    }
  }
  changePitch(slider) {
    let synth = this.state.synth
    let newPitch = slider.target.value * 55 + 40
    console.log(newPitch)
    synth.frequency.value = newPitch
    this.setState({
      synth: synth
    })
  }
  changeVolume(slider) {
    let synth = this.state.synth
    let newVolume = (slider.target.value * 0.58) - 48
    console.log(newVolume)
    synth.volume.value = newVolume
    this.setState({
      synth: synth
    })
  }

  changeWave(newWave) {

    let synth = this.state.synth
    let length = synth.oscillator.type.length
    let lastChar = synth.oscillator.type.charAt([length - 1])
    let partial = ''
    if (!Number(lastChar)) {
      partial = ''
    } else {
      partial = lastChar
    }

    newWave = newWave + partial
    synth.oscillator.type = newWave
    console.log(newWave)
    this.setState({
      synth: synth
    })
  }
  handleChangeWave(select) {
    let newWave = select.target.value
    console.log(newWave)
    this.changeWave(newWave)
  }

  changePartial(newPartial) {
    console.log('newPartial: ' + newPartial)
    console.log('oldPartial: ' + this.state.synth.oscillator.type)
    let synth = this.state.synth
    let type = synth.oscillator.type
    let length = synth.oscillator.type.length
    let lastChar = synth.oscillator.type.charAt([length - 1])
    if (isNaN(lastChar)) {
      console.log('should not end in a number: ' + type)
    } else {
      synth.oscillator.type = synth.oscillator.type.slice(0, - 1)
      console.log(synth.oscillator.type)
    }
    synth.oscillator.type = synth.oscillator.type + newPartial

    this.setState({
      synth: synth
    })
  }

  handleChangePartial(select) {
    let newPartial = select.target.value
    this.changePartial(newPartial)
  }

  render() {
    var pitchChanger = <input type="range" className="slider" onInput={(e) => this.changePitch(e)}/>

    var volumeChanger = <input type="range" className="slider" onInput={(e) => this.changeVolume(e)}/>

    var waveChanger = (
      <select onChange={(e) => this.handleChangeWave(e)}>
        <option value='sine'>Sine</option>
        {/* <option value='sine2'>Sine2</option> */}
        <option value='square'>Square</option>
        {/* <option value='square2'>Square2</option> */}
        {/* <option value='square6'>Square6</option> */}
        <option value='sawtooth'>Sawtooth</option>
        <option value='triangle'>Triangle</option>
      </select>
    )

    var partialChanger = (
      <select onChange={(e) => this.handleChangePartial(e)}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
      </select>
    )
    return(
      <div>
        <h2>Synth {this.props.index}</h2>
        <button onClick={(e) => this.startStop()}>Start</button>
        <p>Pitch</p>
        {pitchChanger}
        <p>Volume</p>
        {volumeChanger}
        <p>Wave Form</p>
        {waveChanger}
        <p>Partials</p>
        {partialChanger}
      </div>
    )
  }
}

export default Sound
