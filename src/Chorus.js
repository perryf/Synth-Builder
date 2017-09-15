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
      <div className="effects-box chorus">
        <h3 className="effects-heading">Chorus</h3>
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

export default Chorus
