const initialState = {
  isDisplayed: false,
  modalType: null,
  currentName: null,
  projectID: null,
  paletteID: null
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      const {
        isDisplayed,
        modalType,
        currentName,
        projectID,
        paletteID
      } = action;
      return { isDisplayed, modalType, currentName, projectID, paletteID };
    default:
      return state;
  }
}