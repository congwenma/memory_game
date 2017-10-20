import './Flip.scss'
import React from 'react'

// taken from https://codepen.io/darkwing/pen/bCali?q=flip+animation&limit=all&type=type-pens
export default class Flip extends React.Component {
  constructor() {
    super()
    this.state = { flipped: true && 0 } //flipped means face up
  }

  handleToggle = () => this.setState({ flipped: !this.state.flipped })

  render() {
    const { front, back, className } = this.props;
    const { flipped } = this.state;
    return <div
      className={`flip-container ${flipped && 'toggling'} ${className}`}
      ontouchstart="this.classList.toggle('hover');"
    >
      <div className={`flipper`}>
        <div className="front" onClick={this.handleToggle}>
          {front}
        </div>
        <div className="back" onClick={this.handleToggle}>
          {back}
        </div>
      </div>
    </div>;
  }
}