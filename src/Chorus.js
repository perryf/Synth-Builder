import React, { Component } from 'react'
import update from 'immutability-helper'
import './Sound.css'

class Chorus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chorus: this.props.chorus
    }
  }

  //phase, frequency, amplitude

  changeFrequency(slider) {
    let newAmt = slider.target.value * 0.5999 + 0.01
    let newChorus = update(this.state.chorus, {frequency: {value: {$set: newAmt}}})
    this.setState({
      chorus: newChorus
    })
  }

  changeDepth(slider) {
    let newAmt = slider.target.value * 0.01
    let newChorus = update(this.state.chorus, {depth: {$set: newAmt}})
    this.setState({
      chorus: newChorus
    })
  }

  changeWet(slider) {
    let newAmt = slider.target.value * 0.01
    let newChorus = update(this.state.chorus, {wet: {value: {$set: newAmt}}})
    this.setState({
      chorus: newChorus
    })
  }

  render () {
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
      <div className="chorus">
        <h2>Chorus {this.props.index}</h2>
        <div>Frequency: {freqAmt}</div>
        <div>Depth: {depthAmt}</div>
        <div>Dry/Wet: {wetAmt}</div>
      </div>
    )
  }
}

export default Chorus
