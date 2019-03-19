import React, { Component } from 'react';
import { ColorSection } from '../ColorSection/ColorSection';
import { Menu } from '../Menu/Menu';
import { Modal } from '../Modal/Modal';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      lockedColors: [],
      menuDisplayed: false,
      modalDisplayed: false
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
      return (
        <ColorSection
          key={color}
          colors={colors}
          lockedColors={lockedColors}
          color={color}
          index={index}
          toggleLock={this.toggleLock}
        />
      );
    });
    if (menuDisplayed) {
      return [
        <div className="main--container" key="container">{sections}</div>,
        <Menu key='menu' toggleModal={this.toggleModal}/>
      ];
    }
    return <div className="main--container">{sections}</div>;
  }

  toggleLock = (lockedColors) => {
    this.setState({ lockedColors });
  }

  toggleModal = () => {
    this.setState({ modalDisplayed: !this.state.modalDisplayed });
  }

  toggleMenu = () => {
    this.setState({ menuDisplayed: !this.state.menuDisplayed });
  }

  render() {
    const gridTemplateColumns = this.state.menuDisplayed ? '1fr 248px' : '1fr';
    return (
      <div className="App">
        {this.state.modalDisplayed && 
          <div className="App--overlay" onClick={this.toggleModal}></div>}
        <h1 className="App--h1">palette picker</h1>
        <header>
          <button onClick={this.generateColors} className="header--button">
            generate palette
          </button>
          <div className="header--menu" onClick={this.toggleMenu}></div>
        </header>
        <main className="main" style={{ gridTemplateColumns }}>
          {this.renderColors()}
          {this.state.modalDisplayed && <Modal />}
        </main>
      </div>
    );
  }
}