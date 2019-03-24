import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class EditModal extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    this.setState({ name: this.props.text });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form className="Modal" onSubmit={this.handleSubmit}>
        <h4 className="Modal--h4">{`edit ${this.props.name}`}</h4>
        <input
          className="Modal--input"
          name="name"
          placeholder="project name"
          value={this.state.name}
          onChange={this.handleChange}
          required 
        />
        <input type="submit" value="save" className="Modal--button" />
        <button className="Modal--button">
          delete
        </button>
      </form>
    );
  }
}

EditModal.propTypes = {
  isDisplayed: PropTypes.bool,
  name: PropTypes.string,
  text: PropTypes.string
}