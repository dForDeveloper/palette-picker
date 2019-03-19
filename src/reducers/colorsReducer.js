export const colorsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_COLORS':
      return action.colors;
    default:
      return state;
  }
}