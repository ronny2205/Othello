
import React, { Component } from 'react';

const buttonStyle = {
  margin: '10px 10px 10px 0'
};

export class Button extends Component {
  render() {
    return (
      <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={this.props.handleClick}>{this.props.label}</button>
    );
  }
}
