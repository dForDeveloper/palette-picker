export const lockedColorsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOCKED_COLORS':
      return action.lockedColors;
    default:
      return state;
  }
}