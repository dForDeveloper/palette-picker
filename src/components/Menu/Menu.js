import React, { Component } from 'react';

export class Menu extends Component {
  handleClick = () => {
    this.props.toggleModal();
  }

  render() {
    return (
      <section key="menu" className="Menu">
        <h2 className="h2">Projects</h2>
        <button className="Menu--button" onClick={this.handleClick}>
          save palette
        </button>
      </section>
    );
  }
}