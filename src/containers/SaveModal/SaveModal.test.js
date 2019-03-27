import React from 'react';
import { shallow } from 'enzyme';
import { postProject } from '../../thunks/postProject';
import { postPalette } from '../../thunks/postPalette';
import { SaveModal, mapStateToProps, mapDispatchToProps } from './SaveModal';

jest.mock('../../thunks/postProject');
jest.mock('../../thunks/postPalette');

const mockColors = ['#123456', '#234567', '#345678', '#456789', '#56789a'];

describe('SaveModal', () => {
  let wrapper;
  const mockProps = {
    colors: ['#aabbcc', '#bbccdd', '#ccddee', '#778899', '#ffffff'],
    projects: [
      { id: 1, name: 'my project' },
      { id: 2, name: 'other project' },
    ],
    postProject: jest.fn(),
    postPalette: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<SaveModal {...mockProps} />);
  });

  describe('render', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call handleSubmit when the form is submitted', () => {
      jest.spyOn(wrapper.instance(), 'handleSubmit');
      wrapper.instance().forceUpdate();
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.find('.Modal').simulate('submit', mockEvent);
      expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
    });

    it('should call handleChange when the project input changes', () => {
      jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().forceUpdate();
      const mockEvent = { target: { value: 'a'} };
      wrapper.find('[name="projectName"]').simulate('change', mockEvent);
      expect(wrapper.instance().handleChange).toHaveBeenCalled();
    });

    it('should call handleChange when the palette input changes', () => {
      jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().forceUpdate();
      const mockEvent = { target: { value: 'b'} };
      wrapper.find('[name="paletteName"]').simulate('change', mockEvent);
      expect(wrapper.instance().handleChange).toHaveBeenCalled();
    });
  });

  describe('handleChange', () => {
    it('should set state with event.target.value', () => {
      const mockEvent = { target: { value: 'asdf' , name: 'projectName' } };
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('projectName')).toEqual('asdf');
    });
  });

  describe('handleSubmit', () => {
    it('should call postPalette if the project name exists', () => {
      wrapper.setState({ projectName: 'my project', paletteName: 'pal 1' });
      wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
      expect(mockProps.postPalette).toHaveBeenCalled();
    });
    
    it('should call postProject if the project name is new', () => {
      wrapper.setState({ projectName: 'a', paletteName: 'b' });
      wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
      expect(mockProps.postProject).toHaveBeenCalled();
    });
  });
});

describe('mapStateToProps', () => {
  it('should return a props object with the correct properties', () => {
    const mockState = {
      colors: mockColors,
      projects: [{ id: 1, name: 'my project' }],
      extraProperty: true
    };
    const expected = {
      colors: mockColors,
      projects: [{ id: 1, name: 'my project' }]
    };
    const result = mapStateToProps(mockState);
    expect(result).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();
  const mappedProps = mapDispatchToProps(mockDispatch);

  it('should call postPalette', () => {
    const expected = postPalette(1, 'my palette', mockColors);
    mappedProps.postPalette(1, 'my palette', mockColors);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call postProject', () => {
    const expected = postProject('my project', 'my palette', mockColors);
    mappedProps.postProject('my project', 'my palette', mockColors);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});