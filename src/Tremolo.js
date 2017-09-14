import React, { Component } from 'react'
import update from 'immutability-helper'
import './Sound.css'

class Tremolo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tremolo: this.props.tremolo
    }
  }

  //phase, frequency, amplitude

  changeFrequency(slider) {
    let newAmt = slider.target.value * 0.5999 + 0.01
    console.log(newAmt)
    let newTremolo = update(this.state.tremolo, {frequency: {value: {$set: newAmt}}})
    this.setState({
      tremolo: newTremolo
    })
  }

  changeDepth(slider) {
    let newAmt = slider.target.value * 0.01
    console.log(newAmt)
    let newTremolo = update(this.state.tremolo, {depth: {$set: newAmt}})
    this.setState({
      tremolo: newTremolo
    })
  }

  changeWet(slider) {
    let newAmt = slider.target.value * 0.01
    console.log(newAmt)
    let newTremolo = update(this.state.tremolo, {wet: {value: {$set: newAmt}}})
    this.setState({
      tremolo: newTremolo
    })
  }

  render () {
    // console.log(this.state.tremolo)
    let freqAmt = (
      <input type="range" className="slider" onInput={(e) => this.changeFrequency(e)} />
    )
    let depthAmt = (
      <input type="range" className="slider" onInput={(e) => this.changeDepth(e)} />
    )
    let wetAmt = (
      <input type="range" className="slider" defaultValue="0" onInput={(e) => this.changeWet(e)} />
    )
    return (
      <div className="tremolo">
        <h2>Tremolo {this.props.index}</h2>
        <div>Frequency: {freqAmt}</div>
        <div>Depth: {depthAmt}</div>
        <div>Dry/Wet: {wetAmt}</div>
      </div>
    )
  }
}

export default Tremolo
