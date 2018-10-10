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
  changeFrequency(slider) {
    let newAmt = slider.target.value * 0.399 + 0.2
    let newLfo = update(this.state.lfo, {frequency: {value: {$set: newAmt}}})
    this.setState({
      lfo: newLfo
    })
  }
  changeDepth(slider) {
    let newAmt = slider.target.value * 0.01
    let newLfo = update(this.state.lfo, {depth: {value: {$set: newAmt}}})
    this.setState({
      lfo: newLfo
    })
  }
  changeWet(slider) {
    let newAmt = slider.target.value * 0.01
    let newLfo = update(this.state.lfo, {wet: {value: {$set: newAmt}}})
    this.setState({
      lfo: newLfo
    })
  }
render() {
    let freqAmt = (
      <input type="range" className="slider" onInput={(e) => this.changeFrequency(e)} />
    )
    let depthAmt = (
      <input type="range" className="slider" onInput={(e) => this.changeDepth(e)} />
    )
    let wetAmt = (
      <input type="range" className="slider" defaultValue="0" onInput={(e) => this.changeWet(e)} />
    )
    return(
      <div className="effects-box lfo">
        <h3 className="effects-heading">LFO</h3>
        <div>
          <p className="effects-label">Frequency: </p>
          {freqAmt}
        </div>
        <div>
          <p className="effects-label">Depth: </p>
          {depthAmt}
        </div>
        <div>
          <p className="effects-label">Dry/Wet: </p>
          {wetAmt}
        </div>
      </div>
    )
  }
}

export default Lfo
