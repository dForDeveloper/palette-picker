import React from 'react';
import { shallow } from 'enzyme';
import { setModal } from '../../actions';
import { Menu, mapStateToProps, mapDispatchToProps } from './Menu';

describe('Menu', () => {
  let wrapper;
  const mockProps = {
    projects: [{ id: 1, name: 'my project' }],
    palettes: { '1': [{ id: 1, project_id: 1 }] },
    setModal: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<Menu {...mockProps} />);
  });

  describe('render', () => {
    it('should match the snapshot when there is no active project', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when there is an active project', () => {
      wrapper.setState({ activeProjectID: 1 });
      expect(wrapper).toMatchSnapshot();
    });
    
    it('should match the snapshot when the drop down is displayed', () => {
      wrapper.setState({ dropDownDisplayed: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('should call toggleDropDown when the header is clicked', () => {
      jest.spyOn(wrapper.instance(), 'toggleDropDown');
      wrapper.instance().forceUpdate();
      wrapper.find('.Menu--header').simulate('click');
      expect(wrapper.instance().toggleDropDown).toHaveBeenCalled();
    });
    
    it('should call toggleModal when save palette is clicked', () => {
      jest.spyOn(wrapper.instance(), 'toggleModal');
      wrapper.instance().forceUpdate();
      wrapper.find('.Menu--button').simulate('click');
      expect(wrapper.instance().toggleModal).toHaveBeenCalled();
    });
  });

  describe('toggleModal', () => {
    it('should call setModal(true, "save")', () => {
      wrapper.instance().toggleModal();
      expect(mockProps.setModal).toHaveBeenCalledWith(true, 'save');
    });
  });

  describe('renderPaletteList', () => {
    it('should return undefined if there are no palettes', () => {
      const result = wrapper.instance().renderPaletteList();
      expect(result).toEqual(undefined);
    });

    it('should return an array equal in length to the palettes array', () => {
      wrapper.setState({ activeProjectID: 1 });
      const result = wrapper.instance().renderPaletteList();
      expect(result).toHaveLength(mockProps.palettes[1].length);
    });
  });

  describe('renderProjectList', () => {
    it('should return an array of length equal to the projects array', () => {
      const result = wrapper.instance().renderProjectList();
      expect(result).toHaveLength(mockProps.projects.length);
    });
  });

  describe('toggleDropDown', () => {
    it('should toggle dropDownDisplayed in state', () => {
      expect(wrapper.state('dropDownDisplayed')).toEqual(false);
      wrapper.instance().toggleDropDown();
      expect(wrapper.state('dropDownDisplayed')).toEqual(true);
    });
  });

  describe('setActiveProject', () => {
    it('should set activeProjectID in state', () => {
      expect(wrapper.state('activeProjectID')).toEqual(null);
      wrapper.instance().setActiveProject(1);
      expect(wrapper.state('activeProjectID')).toEqual(1);
    })
  });
});

describe('mapStateToProps', () => {
  it('should return a props object with the correct properties', () => {
    const mockState = {
      projects: [{ id: 1, name: 'my project' }],
      palettes: { '1': [{ id: 1, project_id: 1 }] },
      extraProperty: true
    };
    const expected = {
      projects: [{ id: 1, name: 'my project' }],
      palettes: { '1': [{ id: 1, project_id: 1 }] }
    };
    const result = mapStateToProps(mockState);
    expect(result).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
  it('should call setModal', () => {
    const mockDispatch = jest.fn();
    const mappedProps = mapDispatchToProps(mockDispatch);
    const expected = setModal(true, 'save');
    mappedProps.setModal(true, 'save');
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});