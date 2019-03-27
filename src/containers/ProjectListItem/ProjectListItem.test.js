import React from 'react';
import { shallow } from 'enzyme';
import { setModal } from '../../actions';
import { getPalettes } from '../../thunks/getPalettes';
import { ProjectListItem, mapDispatchToProps } from './ProjectListItem';

jest.mock('../../thunks/getPalettes');

describe('ProjectListItem', () => {
  let wrapper;
  const mockProps = {
    id: 1,
    name: 'my project',
    getPalettes: jest.fn(),
    setModal: jest.fn(),
    setActiveProject: jest.fn(),
    toggleDropDown: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<ProjectListItem {...mockProps} />);
  });

  describe('render', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call setModal when the edit icon is clicked', () => {
      jest.spyOn(wrapper.instance(), 'setModal');
      wrapper.instance().forceUpdate();
      wrapper.find('.Menu--icon-edit').simulate('click');
      expect(wrapper.instance().setModal).toHaveBeenCalled();
    });
    
    it('should call toggleOpen when the folder icon is clicked', () => {
      jest.spyOn(wrapper.instance(), 'toggleOpen');
      wrapper.instance().forceUpdate();
      wrapper.find('.Menu--icon-folder').simulate('click');
      expect(wrapper.instance().toggleOpen).toHaveBeenCalled();
    });
    
    it('should call toggleOpen when the name is clicked', () => {
      jest.spyOn(wrapper.instance(), 'toggleOpen');
      wrapper.instance().forceUpdate();
      wrapper.find('.Menu--project-name').simulate('click');
      expect(wrapper.instance().toggleOpen).toHaveBeenCalled();
    });
  });

  describe('toggleOpen', () => {
    it('should call three functions', async () => {
      await wrapper.instance().toggleOpen();
      expect(mockProps.getPalettes).toHaveBeenCalledWith(1);
      expect(mockProps.setActiveProject).toHaveBeenCalledWith(1);
      expect(mockProps.toggleDropDown).toHaveBeenCalled();
    });
  });

  describe('setModal', () => {
    it('should call setModal', () => {
      wrapper.instance().setModal();
      expect(mockProps.setModal)
      .toHaveBeenCalledWith(true, 'project', 'my project', 1);
    });
  });
});

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();
  const mappedProps = mapDispatchToProps(mockDispatch);

  it('should call getPalettes', () => {
    const expected = getPalettes(1);
    mappedProps.getPalettes(1);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
  
  it('should call setModal', () => {
    const expected = setModal(true, 'project', 'my project', 1);
    mappedProps.setModal(true, 'project', 'my project', 1);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});