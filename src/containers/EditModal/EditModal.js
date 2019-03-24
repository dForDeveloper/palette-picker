import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { modalType } = this.props;
    if (modalType === 'project') {
      this.props.patchProject(editedName);
    } else if (modalType === 'palette') {
      this.props.patchPalette(editedName);
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

EditModal.propTypes = {
  isDisplayed: PropTypes.bool,
  name: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.number
}