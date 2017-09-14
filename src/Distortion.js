import React, { Component } from 'react'
import update from 'immutability-helper'
import './Sound.css'

class Distortion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      distortion: this.props.distortion
    }
  }

  changeDistAmt(slider) {
    let newDistAmt = slider.target.value * 0.08
    let distortion = update(this.state.distortion, {bits: {$set: newDistAmt}})
    this.setState = {
      distortion: distortion
    }
  }

  changeWetAmt(slider) {
    let newWetAmt = slider.target.value * 0.01
    let distortion = update(this.state.distortion, {wet: {amount: {$: newWetAmt}}})
    this.setState = {
      distortion: distortion
    }
  }

  render() {
    let distAmt = (
      <input type="range" className="slider reverse" onInput={(e) => this.changeDistAmt(e)}/>
    )

    let wetAmt = (
      <input type="range" className="slider reverse" onInput={(e) => this.changeWetAmt(e)}/>
    )

    console.log(this.props.distortion)
    console.log(this.props.distortion.distortion)
    console.log(this.props.distortion.wet.value)
    return(
      <div className="distortion">
        <div>Distortion Amount: {distAmt}</div>
        <div>Wet / Dry: {distAmt}</div>
      </div>
    )
  }
}

export default Distortion
