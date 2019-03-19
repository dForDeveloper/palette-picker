import React, { Component } from 'react';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      lockedColors: [],
      menuDisplayed: false
    };
  }

  componentDidMount() {
    this.generateColors();
  }

  generateColors = () => {
    const { colors, lockedColors } = this.state;
    const newColors = [];
    for (let i = 0; i < 5; i++) {
      if (lockedColors.includes(i)) {
        newColors.push(colors[i]);
      } else {
        let newColor = '#';
        for (let j = 0; j < 3; j++) {
          const num = Math.floor(Math.random() * 256);
          newColor += num < 16 ? `0${num.toString(16)}` : num.toString(16);
        }
        newColors.push(newColor);
      }
    }
    this.setState({ colors: newColors });
  }

  renderColors = () => {
    const { colors, lockedColors, menuDisplayed } = this.state; 
    const sections = colors.map((color, index) => {
      const locked = lockedColors.includes(index);
      const red = parseInt(color.slice(1, 3), 16);
      const green = parseInt(color.slice(3, 5), 16);
      const blue = parseInt(color.slice(5), 16);
      const luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      return (
        <section
          id={color}
          className={`section--locked-${locked}-${luma < 128}`}
          key={color}
          style={{ backgroundColor: color }}
          onClick={this.toggleLock}
        >
          <h3 className={`h3--dark-${luma < 128}`}>{color}</h3>
        </section>
      );
    });
    if (menuDisplayed) {
      sections.push(
        <section key="menu" className="section--menu"></section>
      );
    }
    return sections;
  }

  toggleLock = (event) => {
    let newLockedColors = [];
    const { id } = event.target;
    const { colors, lockedColors } = this.state; 
    const clickedIndex = colors.findIndex(color => color === id);
    if (lockedColors.includes(clickedIndex)) {
      newLockedColors = lockedColors.filter(index => index !== clickedIndex);
    } else {
      newLockedColors = [...lockedColors, clickedIndex];
    }
    this.setState({ lockedColors: newLockedColors });
  }

  toggleMenu = () => {
    this.setState({ menuDisplayed: !this.state.menuDisplayed });
  }

  render() {
    const columnCount = this.state.menuDisplayed ? 6 : 5;
    const gridStyle = { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };
    return (
      <div className="App">
        <h1 className="h1">palette picker</h1>
        <header>
          <button onClick={this.generateColors} className="header--button">
            generate palette
          </button>
          <div className="header--menu" onClick={this.toggleMenu}></div>
        </header>
        <main className="main" style={gridStyle}>{this.renderColors()}</main>
      </div>
    );
  }
}