import * as actions from './';

describe('setColors', () => {
  it('should return an action with type SET_COLORS', () => {
    const mockColors = ['#000000', '#000000', '#000000', '#000000', '#000000'];
    const expected = {
      type: 'SET_COLORS',
      colors: mockColors
    };
    const result = actions.setColors(mockColors);
    expect(result).toEqual(expected);
  });
});

describe('setLockedColors', () => {
  it('should return an action with type SET_LOCKED_COLORS', () => {
    const mockLockedColors = [2, 4];
    const expected = {
      type: 'SET_LOCKED_COLORS',
      lockedColors: mockLockedColors
    };
    const result = actions.setLockedColors(mockLockedColors);
    expect(result).toEqual(expected);
  });
});

describe('setProjects', () => {
  it('should return an action with type SET_PROJECTS', () => {
    const mockProjects = [
      { id: 1, name: 'project 1' },
      { id: 2, name: 'project 2' }
    ];
    const expected = {
      type: 'SET_PROJECTS',
      projects: mockProjects
    };
    const result = actions.setProjects(mockProjects);
    expect(result).toEqual(expected);
  });
});

describe('addProject', () => {
  it('should return an action with type ADD_PROJECT', () => {
    const mockProject = { id: 3, name: 'project 3' };
    const expected = {
      type: 'ADD_PROJECT',
      project: mockProject
    };
    const result = actions.addProject(mockProject);
    expect(result).toEqual(expected);
  });
});

describe('updateProject', () => {
  it('should return an action with type UPDATE_PROJECT', () => {
    const mockID = 4;
    const mockName = 'edited project';
    const expected = {
      type: 'UPDATE_PROJECT',
      id: mockID,
      name: mockName
    };
    const result = actions.updateProject(mockID, mockName);
    expect(result).toEqual(expected);
  });
});

describe('removeProject', () => {
  it('should return an action with type REMOVE_PROJECT', () => {
    const mockID = 5;
    const expected = {
      type: 'REMOVE_PROJECT',
      id: mockID
    };
    const result = actions.removeProject(mockID);
    expect(result).toEqual(expected);
  });
});

describe('setPalettes', () => {
  it('should return an action with type SET_PALETTES', () => {
    const mockProjectID = 6;
    const mockPalettes = [
      {
        name: 'palette 1',
        color1: '#000000',
        color2: '#000000',
        color3: '#000000',
        color4: '#000000',
        color5: '#000000',
        project_id: mockProjectID
      },
      {
        name: 'palette 2',
        color1: '#ffffff',
        color2: '#ffffff',
        color3: '#ffffff',
        color4: '#ffffff',
        color5: '#ffffff',
        project_id: mockProjectID
      }
    ]
    const expected = {
      type: 'SET_PALETTES',
      projectID: mockProjectID,
      palettes: mockPalettes
    };
    const result = actions.setPalettes(mockProjectID, mockPalettes);
    expect(result).toEqual(expected);
  });
});

describe('addPalette', () => {
  it('should return an action with type ADD_PALETTE', () => {
    const mockProjectID = 6
    const mockPalette = {
      name: 'palette 1',
      color1: '#000000',
      color2: '#000000',
      color3: '#000000',
      color4: '#000000',
      color5: '#000000',
      project_id: mockProjectID
    }
    const expected = {
      type: 'ADD_PALETTE',
      projectID: mockProjectID,
      palette: mockPalette
    };
    const result = actions.addPalette(mockProjectID, mockPalette);
    expect(result).toEqual(expected);
  });
});

describe('updatePalette', () => {
  it('should return an action with type UPDATE_PALETTE', () => {
    const mockProjectID = 7;
    const mockPaletteID = 8;
    const mockName = 'edited palette';
    const expected = {
      type: 'UPDATE_PALETTE',
      projectID: mockProjectID,
      paletteID: mockPaletteID,
      name: mockName
    };
    const result = actions.updatePalette(
      mockProjectID,
      mockPaletteID,
      mockName
    );
    expect(result).toEqual(expected);
  });
});

describe('removePalette', () => {
  it('should return an action with type REMOVE_PALETTE', () => {
    const mockProjectID = 9;
    const mockPaletteID = 10;
    const expected = {
      type: 'REMOVE_PALETTE',
      projectID: mockProjectID,
      paletteID: mockPaletteID
    };
    const result = actions.removePalette(mockProjectID, mockPaletteID);
    expect(result).toEqual(expected);
  });
});

describe('setModal', () => {
  it('should return an action with type SET_MODAL', () => {
    const mockModal = {
      isDisplayed: true,
      modalType: 'palette',
      currentName: 'palette 11',
      projectID: 12,
      paletteID: 13
    }
    const expected = {
      type: 'SET_MODAL',
      ...mockModal
    };
    const result = actions.setModal(true, 'palette', 'palette 11', 12, 13);
    expect(result).toEqual(expected);
  });
});

describe('toggleLoading', () => {
  it('should return an action with type TOGGLE_LOADING', () => {
    const expected = {
      type: 'TOGGLE_LOADING',
      bool: true
    };
    const result = actions.toggleLoading(true);
    expect(result).toEqual(expected);
  });
});

describe('setError', () => {
  it('should return an action with type SET_ERROR', () => {
    const expected = {
      type: 'SET_ERROR',
      message: 'Error fetch projects'
    };
    const result = actions.setError('Error fetch projects');
    expect(result).toEqual(expected);
  });
});