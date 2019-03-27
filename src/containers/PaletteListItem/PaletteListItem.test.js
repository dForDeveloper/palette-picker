import React from 'react';
import { shallow } from 'enzyme';
import { setColors, setLockedColors, setModal } from '../../actions';
import { PaletteListItem, mapDispatchToProps } from './PaletteListItem';

const mockColors = ['#123456', '#234567', '#345678', '#456789', '#56789a'];

describe('PaletteListItem', () => {
  let wrapper;
  const mockProps = {
    color1: '#123456',
    color2: '#234567',
    color3: '#345678',
    color4: '#456789',
    color5: '#56789a',
    id: 1,
    name: 'my palette',
    project_id:  1,
    setColors: jest.fn(),
    setLockedColors: jest.fn(),
    setModal: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<PaletteListItem {...mockProps} />);
  });

  describe('render', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call setModal when the edit icon is clicked', () => {
      jest.spyOn(wrapper.instance(), 'setModal');
      wrapper.instance().forceUpdate();
      wrapper.find('.Menu--icon-edit-light').simulate('click');
      expect(wrapper.instance().setModal).toHaveBeenCalled();
    });

    it('should call setColors when the span is clicked', () => {
      wrapper.find('.Menu--palette-span').simulate('click');
      expect(mockProps.setColors).toHaveBeenCalled();
    });
    
    it('should call setLockedColors when the span is clicked', () => {
      wrapper.find('.Menu--palette-span').simulate('click');
      expect(mockProps.setLockedColors).toHaveBeenCalled();
    });
  });

  describe('setModal', () => {
    it('should call setModal', () => {
      wrapper.instance().setModal();
      expect(mockProps.setModal)
      .toHaveBeenCalledWith(true, 'palette', 'my palette', 1, 1);
    });
  });

  describe('renderPaletteRectangle', () => {
    it('should return an array of five divs', () => {
      const result = wrapper.instance().renderPaletteRectangle(mockColors);
      expect(result).toHaveLength(5);
    });
  });
});

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();
  const mappedProps = mapDispatchToProps(mockDispatch);

  it('should call setColors', () => {
    const expected = setColors(mockColors);
    mappedProps.setColors(mockColors);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
  
  it('should call setLockedColors', () => {
    const expected = setLockedColors([]);
    mappedProps.setLockedColors([]);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
  
  it('should call setModal', () => {
    const expected = setModal(true, 'palette', 'my palette', 1, 1);
    mappedProps.setModal(true, 'palette', 'my palette', 1, 1);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});