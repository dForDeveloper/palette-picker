import React, { Component } from 'react';
import { fetchData, createOptions } from '../../utils/api';

export class Modal extends Component {
  constructor() {
    super();
    this.state = {
      projectName: '',
      paletteName: ''
    }
  }

  addNewProject = async () => {
    const name = this.state.projectName;
    const options = createOptions('POST', { name });
    const { id } = await fetchData('/api/v1/projects', options);
    await this.addPaletteToProject(id);
  }

  addPaletteToProject = async (projectID) => {
    const project_id = parseInt(projectID);
    const { paletteName: name, projectName } = this.state;
    const [color1, color2, color3, color4, color5] = this.props.colors;
    const body = { name, project_id, color1, color2, color3, color4, color5 };
    const options = createOptions('POST', body);
    const { id } = await fetchData('/api/v1/palettes', options);
    this.props.updateProjects(projectName, { ...body, id });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { projectName } = this.state;
    const { projects } = this.props;
    if (projects.some(project => project.name === projectName)) {
      console.log('projectbyquery')
      const { id } = await fetchData(`/api/v1/projects?name=${projectName}`);
      await this.addPaletteToProject(id);
    } else {
      await this.addNewProject();
    }
    this.props.toggleModal();
  }

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
        <button className="Modal--button">
          save
        </button>
      </form>
    );
  }
}