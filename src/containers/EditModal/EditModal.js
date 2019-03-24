import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class EditModal extends Component {
  state = {
    textInput: '',
  };

  componentDidMount() {
    this.setState({ textInput: this.props.text });
  }

  handleChange = (event) => {
    this.setState({ textInput: event.target.value });
  };

  handleClick = () => {

  }

  handleSubmit = (event) => {
    event.preventDefault();
    // const { modalType } = this.props;
  }

  render() {
    return (
      <form className="Modal" onSubmit={this.handleSubmit}>
        <h4 className="Modal--h4">{`edit ${this.props.modalType}`}</h4>
        <input
          className="Modal--input"
          placeholder={`${this.props.modalType} name`}
          value={this.state.textInput}
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
  text: PropTypes.string
}