import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorSection from '../ColorSection/ColorSection';
import SaveModal from '../SaveModal/SaveModal';
import EditModal from '../EditModal/EditModal';
import Menu from '../../containers/Menu/Menu';
import { getProjects } from '../../thunks/getProjects';
import PropTypes from 'prop-types';
import { setColors, setModal } from '../../actions';

export class App extends Component {
  state = {
    menuDisplayed: false
  };

  componentDidMount() {
    this.generateColors();
    this.props.getProjects();
  }

  generateColors = () => {
    const { colors, lockedColors } = this.props;
    const newColors = [];
    for (let i = 0; i < 5; i++) {
      if (lockedColors.includes(i)) {
        newColors.push(colors[i]);
      } else {
        const newColor = '#' + Math.random().toString(16).slice(2, 8);
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

  toggleMenu = () => {
    this.setState({ menuDisplayed: !this.state.menuDisplayed });
  };
  
  closeModals = () => {
    this.props.setModal(false);
  };

  render() {
    const { menuDisplayed } = this.state;
    const { modal } = this.props;
    const { modalType } = modal;
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
          {menuDisplayed && <Menu key="menu" />}
          {modalType === 'save' && <SaveModal />}
          {(modalType === 'project' || modalType === 'palette') && 
            <EditModal {...modal} />}
        </main>
        {modal.isDisplayed && (
          <div className="App--overlay" onClick={this.closeModals} />
        )}
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  colors: state.colors,
  lockedColors: state.lockedColors,
  projects: state.projects,
  modal: state.modal
});

export const mapDispatchToProps = (dispatch) => ({
  setColors: (colors) => dispatch(setColors(colors)),
  getProjects: () => dispatch(getProjects()),
  setModal: (isDisplayed) => dispatch(setModal(isDisplayed))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  colors: PropTypes.array,
  lockedColors: PropTypes.array,
  projects: PropTypes.array,
  modal: PropTypes.object,
  setColors: PropTypes.func,
  setModal: PropTypes.func,
  getProjects: PropTypes.func
};
