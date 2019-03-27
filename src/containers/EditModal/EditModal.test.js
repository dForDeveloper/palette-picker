import React from 'react';
import { shallow } from 'enzyme';
import { setColors, setModal } from '../../actions';
import { patchProject } from '../../thunks/patchProject';
import { patchPalette } from '../../thunks/patchPalette';
import { deleteProject } from '../../thunks/deleteProject';
import { deletePalette } from '../../thunks/deletePalette';
import { EditModal, mapStateToProps, mapDispatchToProps } from './EditModal';

jest.mock('../../thunks/patchProject');
jest.mock('../../thunks/patchPalette');
jest.mock('../../thunks/deleteProject');
jest.mock('../../thunks/deletePalette');

describe('EditModal', () => {
  let wrapper;
  const mockProjectProps = {
    isDisplayed: true,
    modalType: 'project',
    currentName: 'my project',
    projectID: 1,
    paletteID: null,
    projects: [{ name: 'my project' }, { name: 'other project'}],
    patchProject: jest.fn(),
    patchPalette: jest.fn(),
    deleteProject: jest.fn(),
    deletePalette: jest.fn()
  };
  const mockPaletteProps = {
    ...mockProjectProps,
    modalType: 'palette',
    currentName: 'my palette',
    projectID: 1,
    paletteID: 1
  };

  beforeEach(() => {
    wrapper = shallow(<EditModal {...mockProjectProps} />);
  });

  describe('render', () => {
    it('should match the snapshot when modalType is project', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when modalType is palette', () => {
      wrapper = shallow(<EditModal {...mockPaletteProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot is saveIsDisabled', () => {
      wrapper.setState({ editedName: 'other project' });
      expect(wrapper).toMatchSnapshot();
    });

    it('should call handleSubmit when the form is submitted', () => {
      jest.spyOn(wrapper.instance(), 'handleSubmit');
      wrapper.instance().forceUpdate();
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.find('.Modal').simulate('submit', mockEvent);
      expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
    });

    it('should call handleChange when the input changes', () => {
      jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().forceUpdate();
      const mockEvent = { target: { value: 'a'} };
      wrapper.find('.Modal--input').simulate('change', mockEvent);
      expect(wrapper.instance().handleChange).toHaveBeenCalled();
    });

    it('should call handleClick the delete button is clicked', () => {
      jest.spyOn(wrapper.instance(), 'handleClick');
      wrapper.instance().forceUpdate();
      wrapper.find('.Modal--button').simulate('click');
      expect(wrapper.instance().handleClick).toHaveBeenCalled();
    });
  });

  describe('componentDidMount', () => {
    it('should set state with the currentName', () => {
      wrapper.instance().componentDidMount();
      expect(wrapper.state('editedName')).toEqual('my project');
    });
  });

  describe('handleChange', () => {
    it('should set state with event.target.value', () => {
      const mockEvent = { target: { value: 'qwerty' } };
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('editedName')).toEqual('qwerty');
    });
  });

  describe('handleClick', () => {
    it('should call deleteProject if modalType is project', () => {
      wrapper.instance().handleClick();
      expect(mockProjectProps.deleteProject).toHaveBeenCalled();
    });

    it('should call deletePalette if modalType is palette', () => {
      wrapper = shallow(<EditModal {...mockPaletteProps} />);
      wrapper.instance().handleClick();
      expect(mockPaletteProps.deletePalette).toHaveBeenCalled();
    });
  });

  describe('handleSubmit', () => {
    it('should call patchProject if modalType is project', () => {
      wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
      expect(mockProjectProps.patchProject).toHaveBeenCalled();
    });

    it('should call patchPalette if modalType is palette', () => {
      wrapper = shallow(<EditModal {...mockPaletteProps} />);
      wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
      expect(mockPaletteProps.patchPalette).toHaveBeenCalled();
    });
  });
});

describe('mapStateToProps', () => {
  it('should return a props object with the correct properties', () => {
    const mockState = {
      projects: [{ id: 1, name: 'my project' }],
      extraProperty: true
    };
    const expected = { projects: [{ id: 1, name: 'my project' }] };
    const result = mapStateToProps(mockState);
    expect(result).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();
  const mappedProps = mapDispatchToProps(mockDispatch);

  it('should call patchProject', () => {
    const expected = patchProject(1, 'edited project name');
    mappedProps.patchProject(1, 'edited project name');
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call patchPalette', () => {
    const expected = patchPalette(1, 2, 'edited palette name');
    mappedProps.patchPalette(1, 2, 'edited palette name');
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call deleteProject', () => {
    const expected = deleteProject(1);
    mappedProps.deleteProject(1);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call deletePalette', () => {
    const expected = deletePalette(1, 2);
    mappedProps.deletePalette(1, 2);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});