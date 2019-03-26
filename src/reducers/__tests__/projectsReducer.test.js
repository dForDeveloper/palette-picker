import { projectsReducer } from '../projectsReducer';

describe('projectsReducer', () => {
  const mockState = [
    { id: 1, name: 'project 1' },
    { id: 2, name: 'project 2' }
  ]

  it('should return an empty array by default', () => {
    const expected = [];
    const result = projectsReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return action.project if case is SET_PROJECTS', () => {
    const mockProjects = [
      { id: 3, name: 'project 3' },
      { id: 4, name: 'project 4' }
    ];
    const mockAction = {
      type: 'SET_PROJECTS',
      projects: mockProjects
    };
    const result = projectsReducer(mockState, mockAction);
    expect(result).toEqual(mockProjects);
  });

  it('should return an array if case is ADD_PROJECT', () => {
    const mockProject = { id: 4, name: 'project 4' };
    const mockAction = {
      type: 'ADD_PROJECT',
      project: mockProject
    };
    const result = projectsReducer(mockState, mockAction);
    expect(result).toEqual([...mockState, mockProject]);
  });
  
  it('should return an array if case is REMOVE_PROJECT', () => {
    const expected = [{ id: 2, name: 'project 2' }];
    const mockAction = {
      type: 'REMOVE_PROJECT',
      id: 1
    };
    const result = projectsReducer(mockState, mockAction);
    expect(result).toEqual(expected);
  });

  it('should return an array if case is UPDATE_PROJECT', () => {
    const expected = [
    { id: 1, name: 'edited project' },
    { id: 2, name: 'project 2' }
  ]
    const mockAction = {
      type: 'UPDATE_PROJECT',
      id: 1,
      name: 'edited project'
    };
    const result = projectsReducer(mockState, mockAction);
    expect(result).toEqual(expected);
  });
});