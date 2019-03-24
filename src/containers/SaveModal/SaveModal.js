import React, { Component } from 'react';
import { setModal } from '../../actions';
import { saveNewPalette } from '../../thunks/saveNewPalette';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Modal extends Component {
  state = {
    projectName: '',
    paletteName: ''
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { projectName, paletteName } = this.state;
    const { projects, colors, saveNewPalette } = this.props;
    await saveNewPalette(projectName, paletteName, projects, colors);
    this.props.setModal(false);
  };

  render() {
    return (
      <form className="Modal" onSubmit={this.handleSubmit}>
        <h4 className="Modal--h4">save palette</h4>
        <input
          className="Modal--input"
          name="projectName"
          placeholder="project name"
          value={this.state.projectName}
          onChange={this.handleChange}
          required 
        />
        <input
          className="Modal--input"
          name="paletteName"
          placeholder="palette name"
          value={this.state.paletteName}
          onChange={this.handleChange}
          required
        />
        <input type="submit" value="save" className="Modal--button" />
      </form>
    );
  }
}

export const mapStateToProps = (state) => ({
  colors: state.colors,
  projects: state.projects
});

export const mapDispatchToProps = (dispatch) => ({
  saveNewPalette: (projectName, paletteName, projects, colors) => {
    dispatch(saveNewPalette(projectName, paletteName, projects, colors));
  },
  setModal: (isDisplayed) => dispatch(setModal(isDisplayed))
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

Modal.propTypes = {
  colors: PropTypes.array,
  projects: PropTypes.array,
  saveNewPalette: PropTypes.func,
  setModal: PropTypes.func
};