import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { setColors, setModal } from '../../actions';
import { getProjects } from '../../thunks/getProjects';

jest.mock('../../thunks/getProjects');

describe('App', () => {
  let wrapper;
  const mockProps = {
    colors: ['#aabbcc', '#bbccdd', '#ccddee', '#778899', '#112233'],
    lockedColors: [],
    projects: [],
    modal: { modalType: null },
    setColors: jest.fn(),
    setModal: jest.fn(),
    getProjects: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<App {...mockProps} />);
  });

  describe('render', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  
    it('should match the snapshot when menuDisplayed is true', () => {
      wrapper.setState({ menuDisplayed: true });
      expect(wrapper).toMatchSnapshot();
    });
  
    it('should match the snapshot when modalType is save', () => {
      const mockModal = {
        isDisplayed: true,
        modalType: 'save',
        currentName: null,
        projectID: null,
        paletteID: null
      }
      wrapper = shallow(<App {...mockProps} modal={mockModal} />);
      expect(wrapper).toMatchSnapshot();
    });
    
    it('should match the snapshot when modalType is palette', () => {
      const mockModal = {
        isDisplayed: true,
        modalType: 'palette',
        currentName: 'my palette',
        projectID: 1,
        paletteID: 1
      }
      wrapper = shallow(<App {...mockProps} modal={mockModal} />);
      expect(wrapper).toMatchSnapshot();
    });
  
    it('should call generateColors when generate palette is clicked', () => {
      jest.spyOn(wrapper.instance(), 'generateColors');
      wrapper.instance().forceUpdate();
      wrapper.find('.header--button').simulate('click');
      expect(wrapper.instance().generateColors).toHaveBeenCalled();
    });
    
    it('should call toggleMenu when the menu button is clicked', () => {
      jest.spyOn(wrapper.instance(), 'toggleMenu');
      wrapper.instance().forceUpdate();
      wrapper.find('.header--menu').simulate('click');
      expect(wrapper.instance().toggleMenu).toHaveBeenCalled();
    });
  
    it('should call closeModals when the overlay is clicked', () => {
      const mockModal = {
        isDisplayed: true,
        modalType: 'palette',
        currentName: 'my palette',
        projectID: 1,
        paletteID: 1
      }
      wrapper = shallow(<App {...mockProps} modal={mockModal} />);
      jest.spyOn(wrapper.instance(), 'closeModals');
      wrapper.instance().forceUpdate();
      wrapper.find('.App--overlay').simulate('click');
      expect(wrapper.instance().closeModals).toHaveBeenCalled();
    });
  });

  describe('componentDidMount', () => {
    it('should call generateColors', () => {
      jest.spyOn(wrapper.instance(), 'generateColors');
      wrapper.instance().forceUpdate();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().generateColors).toHaveBeenCalled();
    });

    it('should call getProjects', () => {
      wrapper.instance().componentDidMount();
      expect(mockProps.getProjects).toHaveBeenCalled();
    });
  });

  describe('generateColors', () => {
    it('should call setColors', () => {
      wrapper.instance().generateColors();
      expect(mockProps.setColors).toHaveBeenCalled();
    });
  });
  
  describe('renderColors', () => {
    it('should return an array of five ColorSections', () => {
      const result = wrapper.instance().renderColors();
      expect(result).toHaveLength(5);
    });
  });

  describe('toggleMenu', () => {
    it('should toggle menuDisplayed in state', () => {
      expect(wrapper.state('menuDisplayed')).toEqual(false);
      wrapper.instance().toggleMenu();
      expect(wrapper.state('menuDisplayed')).toEqual(true);
    });
  });

  describe('closeModals', () => {
    it('should call setModal(false)', () => {
      wrapper.instance().closeModals();
      expect(mockProps.setModal).toHaveBeenCalledWith(false);
    });
  });
});

describe('mapStateToProps', () => {
  it('should return a props object with the correct properties', () => {
    const mockState = {
      colors: ['#abcdef'],
      lockedColors: [0],
      projects: [{ id: 1, name: 'my project' }],
      modal: { isDisplayed: false },
      extraProperty: true
    };
    const expected = {
      colors: ['#abcdef'],
      lockedColors: [0],
      projects: [{ id: 1, name: 'my project' }],
      modal: { isDisplayed: false }
    };
    const result = mapStateToProps(mockState);
    expect(result).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();
  const mappedProps = mapDispatchToProps(mockDispatch);

  it('should dispatch setColors', () => {
    const expected = setColors(['#abcdef']);
    mappedProps.setColors(['#abcdef']);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch setModal', () => {
    const expected = setModal(false);
    mappedProps.setModal(false);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch getProjects', () => {
    const expected = getProjects();
    mappedProps.getProjects();
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});