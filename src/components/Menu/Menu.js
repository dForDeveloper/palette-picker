import React, { Component } from 'react';

export class Menu extends Component {
  handleClick = () => {
    this.props.toggleModal();
  }

  render() {
    return (
      <section className="Menu">
        <h2 className="Menu--h2">projects</h2>
        <button className="Menu--button" onClick={this.handleClick}>
          save palette
        </button>
      </section>
    );
  }
}