const initialState = {
  isDisplayed: false,
  name: null,
  text: null,
  id: null
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      const { isDisplayed, modalType, currentName, id } = action;
      return { isDisplayed, modalType, currentName, id };
    default:
      return state;
  }
}