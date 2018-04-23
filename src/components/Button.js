
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const buttonStyle = {
  margin: '20px 20px 20px 0'
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

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};