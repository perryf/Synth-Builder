import React, { Component } from 'react';
import './Main.css';
import Sound from './Sound'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      toneAmount: 0
    }
  }
  render() {
    return (
      <div>
        <Sound toneAmount={this.state.toneAmount}/>
      </div>
    )
  }
}

export default Main;
