import React, { Component } from 'react';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: []
    };
  }

  componentDidMount() {
    this.generateColors();
  }

  generateColors = () => {
    const colors = []
    for (let i = 0; i < 5; i++) {
      let color = '#';
      for (let j = 0; j < 3; j++) {
        const num = Math.floor(Math.random() * 256);
        color += num < 16 ? `0${num.toString(16)}` : num.toString(16);
      }
      colors.push(color);
    }
    this.setState({ colors });
  }

  renderColors = () => {
    return this.state.colors.map(color => {
      return (
        <section
          className="main--color-section"
          key={color}
          style={{ backgroundColor: color }}
        >
        </section>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="h1">Palette Picker</h1>
        <button onClick={this.generateColors} className="App--button">
          Generate Palette
        </button>
        <main className="main">{this.renderColors()}</main>
      </div>
    );
  }
}