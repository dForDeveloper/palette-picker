import React, { Component } from 'react';
import folderOpen from '../../icons/folderopen.svg';
import folderClosed from '../../icons/folderclosed.svg';
import PropTypes from 'prop-types';


export class ProjectListItem extends Component {
  renderPalettes = () => {
    return this.props.palettes.map(palette => {
      const { color1, color2, color3, color4, color5 } = palette;
      const colors = [color1, color2, color3, color4, color5];
      const paletteRectangle = colors.map(color => {
        return (
          <div
            style={{ backgroundColor: color }}
            className="Menu--palette-square"
            key={color}
          ></div>
        );
      });
      return (
        <li key={palette.created_at}>
          <p>{palette.name}</p>
          <span className="Menu--palette-span">{paletteRectangle}</span>
        </li>
      );
    })
  };

  toggleOpen = async (event) => {
    const { id } = event.target.closest('li').dataset;
    if (!this.props.palettes) await this.props.getPalettes(id);
    const { name, opened } = this.props;
    this.props.toggleOpen(name, !opened);
  };

  render () {
    const { id, name, opened } = this.props;
    return (
      <li data-id={id} className="Menu--list-item">
        {!opened && 
          <img
            src={folderClosed}
            alt="closed folder"
            className="Menu--icon"
            onClick={this.toggleOpen} 
          />
        }
        {opened && 
          <img
            src={folderOpen}
            alt="open folder"
            className="Menu--icon"
            onClick={this.toggleOpen} 
          />
        }
        <span onClick={this.toggleOpen}>{name}</span>
        {opened && 
          <ul className="Menu--ul-palettes">{this.renderPalettes()}</ul>}
      </li>
    );
  }
}

ProjectListItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  getPalettes: PropTypes.func
};