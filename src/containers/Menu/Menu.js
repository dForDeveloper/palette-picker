import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProjectListItem } from '../../components/ProjectListItem/ProjectListItem';
import { getPalettes } from '../../thunks/getPalettes';
import PropTypes from 'prop-types';

export class Menu extends Component {
  state = {
    openedFolders: []
  };

  handleClick = () => {
    this.props.toggleModal();
    this.setState({ openedFolders: [] });
  }

  renderProjectFolders = () => {
    const { openedFolders } = this.state;
    return this.props.projects.map(project => {
      const opened = openedFolders.includes(project.name);
      return (
        <ProjectListItem
          key={project.name}
          {...project}
          opened={opened}
          toggleOpen={this.toggleOpen}
          getPalettes={this.props.getPalettes}
        />
      );
    });
  };

  toggleOpen = (projectName, isOpen) => {
    let [...newFolders] = this.state.openedFolders;
    if (isOpen) {
      newFolders.push(projectName);
    } else {
      newFolders = newFolders.filter(project =>  project !== projectName);
    }
    this.setState({ openedFolders: newFolders });
  }

  render() {
    return (
      <section className="Menu">
        <h2 className="Menu--h2">projects</h2>
        <ul className="Menu--ul-projects">
          {this.renderProjectFolders()}
        </ul>
        <button className="Menu--button" onClick={this.handleClick}>
          save palette
        </button>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  projects: state.projects
});

export const mapDispatchToProps = (dispatch) => ({
  getPalettes: (id) => dispatch(getPalettes(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

Menu.propTypes = {
  projects: PropTypes.array,
  getPalettes: PropTypes.func,
  toggleModal: PropTypes.func
};