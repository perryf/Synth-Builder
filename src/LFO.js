import React, { Component } from 'react'
import update from 'immutability-helper'
import './Sound.css'

class Lfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lfo: this.props.lfo
    }
  }

  //phase, frequency, amplitude

  changeFrequency(slider) {
    let newAmt = slider.target.value * 0.0999 + 0.01
    console.log(newAmt)
    let newLfo = update(this.state.lfo, {frequency: {value: {$set: newAmt}}})
    this.setState({
      lfo: newLfo
    })
  }

  changeAmplitude(slider) {
    let newAmt = slider.target.value * 0.01
    console.log(newAmt)
    let newLfo = update(this.state.lfo, {amplitude: {value: {$set: newAmt}}})
    this.setState({
      lfo: newLfo
    })
  }

  changePhase(slider) {
    let newAmt = slider.target.value * 0.02 - 1
    console.log(newAmt)
    let newLfo = update(this.state.lfo, {phase: {$set: newAmt}})
    this.setState({
      lfo: newLfo
    })
  }

  render () {
    console.log(this.props.lfo)
    let freqAmt = (
      <input type="range" className="slider" onInput={(e) => this.changeFrequency(e)} />
    )
    let ampAmt = (
      <input type="range" className="slider" onInput={(e) => this.changeAmplitude(e)} />
    )
    let phaseAmt = (
      <input type="range" className="slider" onInput={(e) => this.changePhase(e)} />
    )
    return (
      <div className="lfo">
        <h2>LFO {this.props.index}</h2>
        <div>Frequency: {freqAmt}</div>
        <div>Amplitude: {ampAmt}</div>
        <div>Phase: {phaseAmt}</div>
      </div>
    )
  }
}

export default Lfo
