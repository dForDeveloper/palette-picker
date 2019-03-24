import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectListItem from '..//ProjectListItem/ProjectListItem';
import { setModal } from '../../actions';
import PropTypes from 'prop-types';
import PaletteListItem from '../PaletteListItem/PaletteListItem';

export class Menu extends Component {
  state = {
    activeProjectID: null,
    dropDownDisplayed: false,
    menuHeader: 'all projects'
  };

  toggleModal = () => {
    this.props.setModal(true, 'save');
  }

  renderPaletteList = () => {
    const { palettes } = this.props;
    const { activeProjectID } = this.state;
    if (activeProjectID) {
      return palettes[activeProjectID].map(palette => {
        return <PaletteListItem key={palette.created_at} {...palette} />
      });
    }
  };

  renderProjectList = () => {
    return this.props.projects.map(project => {
      return (
        <ProjectListItem
          key={project.name}
          {...project}
          toggleDropDown={this.toggleDropDown}
          setActiveProject={this.setActiveProject}
        />
      );
    });
  };

  toggleDropDown = () => {
    const { dropDownDisplayed } = this.state;
    this.setState({ dropDownDisplayed: !dropDownDisplayed });
  }

  setActiveProject = (id) => {
    const { projects } = this.props;
    const newHeader = projects.find(project => {
      return project.id === parseInt(id);
    }).name;
    this.setState({
      activeProjectID: id,
      menuHeader: newHeader
    });
  }

  render() {
    const { dropDownDisplayed, menuHeader } = this.state;
    return (
      <section className="Menu">
        <header className="Menu--header" onClick={this.toggleDropDown}>
          <h2 className="Menu--h2">{menuHeader}</h2>
          <div className="Menu--icon-arrow"/>
        </header>
        <ul className="Menu--ul-palettes">{this.renderPaletteList()}</ul>
        <button className="Menu--button" onClick={this.toggleModal}>
          save palette
        </button>
        {dropDownDisplayed && 
          <ul className="Menu--drop-down">
            {this.renderProjectList()}
          </ul>}
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  projects: state.projects,
  palettes: state.palettes
});

export const mapDispatchToProps = (dispatch) => ({
  setModal: (isDisplayed, type) => dispatch(setModal(isDisplayed, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

Menu.propTypes = {
  projects: PropTypes.array,
  palettes: PropTypes.object,
  setModal: PropTypes.func
};