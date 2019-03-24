export const palettesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PALETTES':
      const { projectID, palettes } = action;
      return {
        ...state,
        [projectID]: palettes
      };
    default:
      return state;
  }
}