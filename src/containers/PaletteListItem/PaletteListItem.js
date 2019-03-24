import React, { Component } from 'react';
import { setColors, setLockedColors, setModal } from '../../actions';
import { connect } from 'react-redux';
import editlight from '../../icons/editlight.svg';
import PropTypes from 'prop-types';

export class PaletteListItem extends Component {
  setModal = () => {
    this.props.setModal(true, 'palette', this.props.name);
  }

  renderPaletteRectangle = (colors) => {
    return colors.map(color => {
      return (
        <div
          style={{ backgroundColor: color }}
          className="Menu--palette-square"
          key={color}
        ></div>
      );
    });
  }

  render() {
    const { name, color1, color2, color3, color4, color5 } = this.props;
    const colors = [color1, color2, color3, color4, color5];
    return (
      <li>
        <p className="Menu--palette-name">
          {name}
        </p>
        <img
          src={editlight}
          alt="edit icon"
          className="Menu--icon-edit-light"
          onClick={this.setModal}
        />
        <span
          className="Menu--palette-span"
          onClick={() => {
            this.props.setColors(colors);
            this.props.setLockedColors([]);
          }}
        >
          {this.renderPaletteRectangle(colors)}
        </span>
      </li>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setColors: (colors) => dispatch(setColors(colors)),
  setLockedColors: (lockedColors) => dispatch(setLockedColors(lockedColors)),
  setModal: (isDisplayed, type, text) => {
    dispatch(setModal(isDisplayed, type, text))
  }
});

export default connect(null, mapDispatchToProps)(PaletteListItem);

PaletteListItem.propTypes = {
  color1: PropTypes.string,
  color2: PropTypes.string,
  color3: PropTypes.string,
  color4: PropTypes.string,
  color5: PropTypes.string,
  created_at: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  project_id:  PropTypes.number,
  updated_at: PropTypes.string,
  setColors: PropTypes.func,
  setLockedColors: PropTypes.func
};