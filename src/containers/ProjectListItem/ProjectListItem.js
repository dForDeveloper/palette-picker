import React, { Component } from 'react';
import { setModal } from '../../actions';
import folder from '../../icons/folder.svg';
import editdark from '../../icons/editdark.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class ProjectListItem extends Component {
  toggleOpen = async (event) => {
    const { id } = event.target.closest('li').dataset;
    if (!this.props.palettes) await this.props.getPalettes(id);
    this.props.setActiveProject(id)
    this.props.toggleDropDown();
  };

  setModal = () => {
    this.props.setModal(true, 'project', this.props.name);
  }

  render () {
    const { id, name } = this.props;
    return (
      <li data-id={id} className="Menu--list-item">
        <img
          src={folder}
          alt="folder icon"
          className="Menu--icon-folder"
          onClick={this.toggleOpen} 
        />
        <p className="Menu--project-name" onClick={this.toggleOpen}>
          {name}
        </p>
        <img
          src={editdark}
          alt="edit icon"
          className="Menu--icon-edit"
          onClick={this.setModal}
        />
      </li>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setModal: (isDisplayed, type, name) => {
    dispatch(setModal(isDisplayed, type, name))
  }
});

export default connect(null, mapDispatchToProps)(ProjectListItem);

ProjectListItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  getPalettes: PropTypes.func,
  setModal: PropTypes.func
};