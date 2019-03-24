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
    const { modalType, id } = this.props;
    if (modalType === 'project') {
      this.props.deleteProject(id);
    } else if (modalType === 'palette') {
      this.props.deletePalette(id);
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
        <input type="submit" value="save" className="Modal--button" />
        <button className="Modal--button" onClick={this.handleClick}>
          delete
        </button>
      </form>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  patchProject: (projectID, editedName) => {
    dispatch(patchProject(projectID, editedName))
  },
  patchPalette: (projectID, paletteID, editedName) => {
    dispatch(patchPalette(projectID, paletteID, editedName))
  },
  deleteProject: (id) => dispatch(deleteProject(id)),
  deletePalette: (id) => dispatch(deletePalette(id))
});

export default connect(null, mapDispatchToProps)(EditModal);

EditModal.propTypes = {
  isDisplayed: PropTypes.bool,
  name: PropTypes.string,
  text: PropTypes.string,
  projectID: PropTypes.number,
  paletteID: PropTypes.number,
  patchProject: PropTypes.func,
  patchPalette: PropTypes.func,
  deleteProject: PropTypes.func,
  deletePalette: PropTypes.func,
};