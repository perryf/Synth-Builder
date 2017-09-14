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

  changeDist(slider) {
    let newDistAmt = slider.target.value * 0.08
    let distortion = update(this.state.distortion, {bits: {$set: newDistAmt}})
    this.setState = {
      distortion: distortion
    }
  }

  changeWet(slider) {
    let newWetAmt = slider.target.value * 0.01
    console.log(this.state.distortion)
    let distortion = update(this.state.distortion, {wet: {value: {$set: newWetAmt}}})
    this.setState = {
      distortion: distortion
    }
  }

  render() {
    let distAmt = (
      <input type="range" className="slider reverse" onInput={(e) => this.changeDist(e)}/>
    )

    let wetAmt = (
      <input type="range" className="slider" onInput={(e) => this.changeWet(e)}/>
    )
    return(
      <div className="distortion">
        <h2>Distortion {this.props.index}</h2>
        <div>Distortion Amount: {distAmt}</div>
        <div>Dry / Wet: {wetAmt}</div>
      </div>
    )
  }
}

export default Distortion