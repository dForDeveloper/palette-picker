import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorSection from '../ColorSection/ColorSection';
import Modal from '../Modal/Modal';
import { Menu } from '../../components/Menu/Menu';
import { setColors } from '../../actions';
import { fetchProjects } from '../../thunks/fetchProjects';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    menuDisplayed: false,
    modalDisplayed: false
  };

  componentDidMount() {
    this.generateColors();
    this.props.fetchProjects();
  }

  generateColors = () => {
    const { colors, lockedColors } = this.props;
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
    this.props.setColors(newColors);
  };

  renderColors = () => {
    return this.props.colors.map((color, index) => {
      return (
        <ColorSection
          key={color}
          color={color}
          index={index}
          toggleLock={this.toggleLock}
        />
      );
    });
  };

  toggleModal = () => {
    this.setState({ modalDisplayed: !this.state.modalDisplayed });
  };

  toggleMenu = () => {
    this.setState({ menuDisplayed: !this.state.menuDisplayed });
  };

  render() {
    const { menuDisplayed, modalDisplayed } = this.state;
    const gridTemplateColumns = menuDisplayed ? '1fr 248px' : '1fr';
    return (
      <div className="App">
        <h1 className="App--h1">palette picker</h1>
        <header>
          <button onClick={this.generateColors} className="header--button">
            generate palette
          </button>
          <div className="header--menu" onClick={this.toggleMenu} />
        </header>
        <main className="main" style={{ gridTemplateColumns }}>
          <div className="main--div">{this.renderColors()}</div>
          {menuDisplayed && <Menu key="menu" toggleModal={this.toggleModal} />}
          {modalDisplayed && <Modal toggleModal={this.toggleModal} />}
        </main>
        {modalDisplayed && (
          <div className="App--overlay" onClick={this.toggleModal} />
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  colors: state.colors,
  lockedColors: state.lockedColors,
  projects: state.projects
});

export const mapDispatchToProps = dispatch => ({
  setColors: colors => dispatch(setColors(colors)),
  fetchProjects: () => dispatch(fetchProjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  colors: PropTypes.array,
  lockedColors: PropTypes.array,
  projects: PropTypes.array,
  setColors: PropTypes.func,
  fetchProjects: PropTypes.func
};
