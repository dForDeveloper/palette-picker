import React, { Component } from 'react';

export class Modal extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <form className="Modal" onSubmit={this.handleSubmit}>
        <h4 className="Modal--h4">save palette</h4>
        <input className="Modal--input" placeholder="project name"/>
        <input className="Modal--input" placeholder="palette name"/>
        <button className="Modal--button">
          save
        </button>
      </form>
    );
  }
}