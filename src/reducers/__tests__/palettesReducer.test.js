import { palettesReducer } from '../palettesReducer';

describe('palettesReducer', () => {
  const mockState = {
    '1': [
      {
        id: 1,
        name: 'some palette',
        color1: '#aaccbb',
        project_id: 1
      }
    ]
  };
  const mockPalette = {
    id: 1,
    name: 'my palette',
    color1: '#000000',
    project_id: 1
  }

  it('should return an empty object by default', () => {
    const expected = {};
    const result = palettesReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return an object if case is SET_PALETTES', () => {
    const mockProjectID = 2;
    const mockPalettes = [
      {
        id: 2,
        name: 'my palette',
        color1: '#000000',
        project_id: 1
      },
      {
        id: 3,
        name: 'my palette 2',
        color1: '#000000',
        project_id: 1
      }
    ];
    const mockAction = {
      type: 'SET_PALETTES',
      projectID: mockProjectID,
      palettes: mockPalettes
    };
    const result = palettesReducer(mockState, mockAction);
    expect(result).toEqual({ ...mockState, [mockProjectID]: mockPalettes });
  });

  it('should return an object if case is ADD_PALETTE & condition 1', () => {
    const mockAction = {
      type: 'ADD_PALETTE',
      projectID: 1,
      palette: mockPalette
    };
    const expected = { ...mockState, '1': [...mockState[1], mockPalette] };    
    const result = palettesReducer(mockState, mockAction);
    expect(result).toEqual(expected);
  });

  it('should return an object if case is ADD_PALETTE & condition 2', () => {
    const mockAction = {
      type: 'ADD_PALETTE',
      projectID: 2,
      palette: { ...mockPalette, project_id: 2 }
    };
    const expected = { ...mockState, '2': [mockAction.palette] };
    const result = palettesReducer(mockState, mockAction);
    expect(result).toEqual(expected);
  });

  it('should return an object if case is UPDATE_PALETTE', () => {
    const mockAction = {
      type: 'UPDATE_PALETTE',
      projectID: 1,
      paletteID: 1,
      name: 'new name'
    };
    const expected = {
      ...mockState,
      '1': [
        {
          id: 1,
          name: 'new name',
          color1: '#aaccbb',
          project_id: 1
        }
      ]
    };
    const result = palettesReducer(mockState, mockAction);
    expect(result).toEqual(expected);
  });

  it('should return an object if case is REMOVE_PALETTE', () => {
    const mockAction = {
      type: 'REMOVE_PALETTE',
      projectID: 1,
      paletteID: 1
    }
    const expected = { '1': [] };
    const result = palettesReducer(mockState, mockAction);
    expect(result).toEqual(expected);
  });

  it('should return an object if case is REMOVE_PROJECT', () => {
    const mockAction = {
      type: 'REMOVE_PROJECT',
      id: 1
    };
    const expected = {};
    const result = palettesReducer(mockState, mockAction);
    expect(result).toEqual(expected);
  });
});