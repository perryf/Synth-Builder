import React, { Component } from 'react'
import update from 'immutability-helper'
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
    synth.playing = false
    this.props.connectToMaster(synth)
    this.setState({
      synth: synth
    })
  }

  startStop() {
    if (this.state.synth.playing === false) {
      let synth = update(this.state.synth, {playing: {$set: true}})
      this.setState({
        synth: synth
      })
      synth.triggerAttack(synth.oscillator.frequency.value, '+0.05')
    } else {
      let synth = update(this.state.synth, {playing: {$set: false}})
      this.setState({
        synth: synth
      })
      synth.triggerRelease()
    }
  }
  changePitch(slider) {
    let newPitch = slider.target.value * 55 + 40
    let synth = update(this.state.synth, {frequency: {value: {$set: newPitch}}})
    this.setState({
      synth: synth
    })
  }
  changeVolume(slider) {
    let newVolume = (slider.target.value * 0.58) - 48
    let synth = update(this.state.synth, {volume: {value: {$set: newVolume}}})
    this.setState({
      synth: synth
    })
  }

  changeWave(newWave) {
    let length = this.state.synth.oscillator.type.length
    let lastChar = this.state.synth.oscillator.type.charAt([length - 1])
    let partial = ''
    if (!Number(lastChar)) {
      partial = ''
    } else {
      partial = lastChar
    }

    newWave = newWave + partial
    let synth = update(this.state.synth, {oscillator: {type: {$set: newWave}}})
    this.setState({
      synth: synth
    })
  }

  handleChangeWave(select) {
    let newWave = select.target.value
    this.changeWave(newWave)
  }

  changePartial(newPartial) {
    let synth = this.state.synth
    let length = synth.oscillator.type.length
    let lastChar = synth.oscillator.type.charAt([length - 1])
    let type = synth.oscillator.type
    if (isNaN(lastChar)) {
    } else {
      type = type.slice(0, - 1)
    }
    synth = update(synth, {oscillator: {type: {$set: type + newPartial}}})

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
