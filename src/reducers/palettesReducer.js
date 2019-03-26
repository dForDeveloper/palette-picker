export const palettesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PALETTES':
      const { projectID, palettes } = action;
      return { ...state, [projectID]: palettes };
    case 'ADD_PALETTE':
      if (state[action.projectID]) {
        return {
          ...state,
          [action.projectID]: [...state[action.projectID], action.palette]
        };
      } else {
        return {
          ...state,
          [action.projectID]: [action.palette]
        };
      }
    case 'UPDATE_PALETTE':
      const updatedPalettes = state[action.projectID].map(palette => {
        if (palette.id === action.paletteID) {
          return { ...palette, name: action.name }
        }
        return palette;
      });
    return { ...state, [action.projectID]: updatedPalettes };
    case 'REMOVE_PALETTE':
      const filteredPalettes = state[action.projectID].filter(palette => {
        return palette.id !== action.paletteID;
      });
      return { ...state, [action.projectID]: filteredPalettes };
    case 'REMOVE_PROJECT':
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}