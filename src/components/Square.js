import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Square extends Component{
  render(){
    const color_ = this.props.color === '' ? '#e4e4a1': this.props.color === 'w' ? 'white':'black';
    return (
      <td
        style={{
          overflow:'hidden',
          width:'auto',
          height:'50px',
          backgroundColor: '#e4e4a1',
          color:'red',
          boarderColor: 'black',
          border:".5px solid black"
        }}
      onClick={this.props.handleClick} >
        <div
          style={{color:color_,
                  border:"1px solid",
                  backgroundColor: color_,
                  borderRadius: "50%",
                  borderColor: color_,
                  height:25}} >
        </div>
      </td>
    )
  }
}

Square.propTypes = {
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};