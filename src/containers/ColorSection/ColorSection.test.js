import React from 'react';
import { shallow } from 'enzyme';
import { setLockedColors } from '../../actions';
import {
  ColorSection,
  mapStateToProps,
  mapDispatchToProps
} from './ColorSection';

describe('ColorSection', () => {
  let wrapper;
  const mockProps = {
    colors: ['#aabbcc', '#bbccdd', '#ccddee', '#778899', '#ffffff'],
    lockedColors: [0],
    color: '#ffffff',
    index: 0,
    setLockedColors: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<ColorSection {...mockProps} />);
  });

  describe('render', () => {
    it('should match the snapshot when the color is light/locked', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the color is dark/locked', () => {
      wrapper = shallow(<ColorSection {...mockProps} color='#000000' />);
      expect(wrapper).toMatchSnapshot();
    });
    
    it('should match the snapshot when the color is light/unlocked', () => {
      wrapper = shallow(<ColorSection {...mockProps} lockedColors={[]} />);      
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the color is dark/unlocked', () => {
      wrapper = shallow(
        <ColorSection {...mockProps} color='#000000' lockedColors={[]} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should call handleClick when the section is clicked', () => {
      jest.spyOn(wrapper.instance(), 'handleClick');
      wrapper.instance().forceUpdate();
      wrapper.find('section').simulate('click', { target: { id: '#ffffff' } });
      expect(wrapper.instance().handleClick).toHaveBeenCalled();
    });
  });

  describe('handleClick', () => {
    it('should call setLockedColors when unlocked', () => {
      wrapper.instance().handleClick({ target: { id: '#ffffff' } });
      expect(mockProps.setLockedColors).toHaveBeenCalledWith([0 , 4]);
    });
    
    it('should call setLockedColors when locked', () => {
      wrapper.instance().handleClick({ target: { id: '#aabbcc' } });
      expect(mockProps.setLockedColors).toHaveBeenCalledWith([]);
    });
  });
});

describe('mapStateToProps', () => {
  it('should return a props object with the correct properties', () => {
    const mockState = {
      colors: ['#333333'],
      lockedColors: [0],
      extraProperty: true
    };
    const expected = {
      colors: ['#333333'],
      lockedColors: [0]
    }
    const result = mapStateToProps(mockState);
    expect(result).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
  it('should dispatch setLockedColors', () => {
    const mockDispatch = jest.fn();
    const mappedProps = mapDispatchToProps(mockDispatch);
    const expected = setLockedColors([0]);
    mappedProps.setLockedColors([0]);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});