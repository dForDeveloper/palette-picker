import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLockedColors } from '../../actions';
import PropTypes from 'prop-types';

export class ColorSection extends Component {
  handleClick = (event) => {
    let newLockedColors = [];
    const { id } = event.target;
    const { colors, lockedColors } = this.props; 
    const clickedIndex = colors.findIndex(color => color === id);
    if (lockedColors.includes(clickedIndex)) {
      newLockedColors = lockedColors.filter(index => index !== clickedIndex);
    } else {
      newLockedColors = [...lockedColors, clickedIndex];
    }
    this.props.setLockedColors(newLockedColors);
  }

  render() {
    const { lockedColors, color, index } = this.props;
    const locked = lockedColors.includes(index);
    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5), 16);
    const luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    return (
      <section
        id={color}
        className={`section--locked-${locked}-${luma < 128}`}
        style={{ backgroundColor: color }}
        onClick={this.handleClick}
      >
        <h3 className={`h3--dark-${luma < 128}`}>{color}</h3>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  colors: state.colors,
  lockedColors: state.lockedColors
});

export const mapDispatchToProps = (dispatch) => ({
  setLockedColors: (lockedColors) => dispatch(setLockedColors(lockedColors))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorSection);

ColorSection.propTypes = {
  colors: PropTypes.array,
  lockedColors: PropTypes.array,
  color: PropTypes.string,
  index: PropTypes.number,
  setLockedColors: PropTypes.func
}