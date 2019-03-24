import React, { Component } from 'react';
import { setModal } from '../../actions';
import folder from '../../icons/folder.svg';
import editdark from '../../icons/editdark.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPalettes } from '../../thunks/getPalettes';

export class ProjectListItem extends Component {
  toggleOpen = async () => {
    const { palettes, id } = this.props;
    if (!palettes) await this.props.getPalettes(id);
    this.props.setActiveProject(id)
    this.props.toggleDropDown();
  };

  setModal = () => {
    const { name, id, setModal } = this.props;
    setModal(true, 'project', name, id);
  }

  render () {
    const { name } = this.props;
    return (
      <li className="Menu--list-item">
        <img
          src={folder}
          alt="folder icon"
          className="Menu--icon-folder"
          onClick={this.toggleOpen} 
        />
        <p className="Menu--project-name" onClick={this.toggleOpen}>{name}</p>
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
  getPalettes: (id) => dispatch(getPalettes(id)),
  setModal: (isDisplayed, modalType, currentName, id) => {
    dispatch(setModal(isDisplayed, modalType, currentName, id))
  },

});

export default connect(null, mapDispatchToProps)(ProjectListItem);

ProjectListItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  getPalettes: PropTypes.func,
  setModal: PropTypes.func
};