import React, { Component } from 'react';
import { ColorSection } from '../ColorSection/ColorSection';
import { Menu } from '../Menu/Menu';
import { Modal } from '../Modal/Modal';
import { fetchData } from '../../utils/api';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      lockedColors: [],
      menuDisplayed: false,
      modalDisplayed: false,
      projects: []
    };
  }

  componentDidMount() {
    this.generateColors();
    this.fetchProjects();
  }

  fetchProjects = async () => {
    const projects = await fetchData('/api/v1/projects');
    this.setState({ projects });
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

  updateProjects = (projectName, palette) => {
    let [...updatedProjects] = this.state.projects;
    updatedProjects = updatedProjects.map(project => {
      if (project.name === projectName) {
        return { ...project, palettes: [...project.palettes, palette] }
      }
      return project;
    })
    this.setState({ projects: updatedProjects });
  }

  render() {
    const { colors, projects, menuDisplayed, modalDisplayed } = this.state;
    const gridTemplateColumns = menuDisplayed ? '1fr 248px' : '1fr';
    return (
      <div className="App">
        {modalDisplayed && 
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
          {modalDisplayed &&
            <Modal 
              colors={colors}
              projects={projects} 
              updateProjects={this.updateProjects}
              toggleModal={this.toggleModal}
            />}
        </main>
      </div>
    );
  }
}