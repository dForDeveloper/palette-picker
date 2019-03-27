import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { patchProject } from '../../thunks/patchProject';
import { patchPalette } from '../../thunks/patchPalette';
import { deleteProject } from '../../thunks/deleteProject';
import { deletePalette } from '../../thunks/deletePalette';

export class EditModal extends Component {
  state = {
    editedName: '',
  };

  componentDidMount() {
    this.setState({ editedName: this.props.currentName });
  }

  handleChange = (event) => {
    this.setState({ editedName: event.target.value });
  };

  handleClick = () => {
    const { modalType, projectID, paletteID } = this.props;
    if (modalType === 'project') {
      this.props.deleteProject(projectID);
    } else if (modalType === 'palette') {
      this.props.deletePalette(projectID, paletteID);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { editedName } = this.state;
    const { modalType, projectID, paletteID } = this.props;
    if (modalType === 'project') {
      this.props.patchProject(projectID, editedName);
    } else if (modalType === 'palette') {
      this.props.patchPalette(projectID, paletteID, editedName);
    }
  }

  render() {
    const { projects, currentName, modalType } = this.props;
    const saveIsDisabled = modalType === 'project' && projects
      .filter(project => {
        return project.name !== currentName;
      })
      .map(project => project.name)
      .includes(this.state.editedName);
    return (
      <form className="Modal" onSubmit={this.handleSubmit}>
        <h4 className="Modal--h4">{`edit ${this.props.modalType}`}</h4>
        <input
          className="Modal--input"
          placeholder={`${this.props.modalType} name`}
          value={this.state.editedName}
          onChange={this.handleChange}
          autoFocus={true}
          required 
        />
        {saveIsDisabled && 
          <p className="Modal--warning">projects cannot have the same name</p>}
        <input
          type="submit"
          value="save"
          className="Modal--button-edit"
          disabled={saveIsDisabled}
        />
        <button className="Modal--button" onClick={this.handleClick}>
          delete
        </button>
      </form>
    );
  }
}

export const mapStateToProps = (state) => ({
  projects: state.projects
});

export const mapDispatchToProps = (dispatch) => ({
  patchProject: (projectID, editedName) => {
    dispatch(patchProject(projectID, editedName))
  },
  patchPalette: (projectID, paletteID, editedName) => {
    dispatch(patchPalette(projectID, paletteID, editedName))
  },
  deleteProject: (id) => dispatch(deleteProject(id)),
  deletePalette: (projectID, paletteID) => {
    dispatch(deletePalette(projectID, paletteID))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);

EditModal.propTypes = {
  isDisplayed: PropTypes.bool,
  modalType: PropTypes.string,
  currentName: PropTypes.string,
  projectID: PropTypes.number,
  paletteID: PropTypes.number,
  projects: PropTypes.array,
  patchProject: PropTypes.func,
  patchPalette: PropTypes.func,
  deleteProject: PropTypes.func,
  deletePalette: PropTypes.func,
};