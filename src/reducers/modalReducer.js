const initialState = {
  isDisplayed: false,
  name: null,
  text: null
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      const { isDisplayed, name, text } = action;
      return { isDisplayed, name, text };
    default:
      return state;
  }
}