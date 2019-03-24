const initialState = {
  isDisplayed: false,
  name: null,
  text: null
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      const { isDisplayed, modalType, text } = action;
      return { isDisplayed, modalType, text };
    default:
      return state;
  }
}