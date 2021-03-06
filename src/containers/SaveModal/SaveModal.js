import React, { Component } from 'react';
import { postPalette } from '../../thunks/postPalette';
import { postProject } from '../../thunks/postProject';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class SaveModal extends Component {
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
    const { projects, colors, postPalette, postProject } = this.props;
    if (projects.some(project => project.name === projectName)) {
      const { id: projectID } = projects.find(project => {
        return project.name === projectName;
      });
      postPalette(projectID, paletteName, colors);
    } else {
      postProject(projectName, paletteName, colors);
    }
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
          autoFocus={true}
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
  postPalette: (projectID, paletteName, colors) => {
    dispatch(postPalette(projectID, paletteName, colors))
  },
  postProject: (projectName, paletteName, colors) => {
    dispatch(postProject(projectName, paletteName, colors))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveModal);

SaveModal.propTypes = {
  colors: PropTypes.array,
  projects: PropTypes.array,
  postPalette: PropTypes.func,
  postProject: PropTypes.func
};