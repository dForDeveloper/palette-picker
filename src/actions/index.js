export const setColors = (colors) => ({
  type: 'SET_COLORS',
  colors
});

export const setLockedColors = (lockedColors) => ({
  type: 'SET_LOCKED_COLORS',
  lockedColors
});

export const setProjects = (projects) => ({
  type: 'SET_PROJECTS',
  projects
});

export const toggleLoading = (bool) => ({
  type: 'TOGGLE_LOADING',
  bool
});

export const setError = (message) => ({
  type: 'SET_ERROR',
  message
});

export const setPalettes = (id, palettes) => ({
  type: 'SET_PALETTES',
  id,
  palettes
});

export const setModal = (isDisplayed, modalType = null, text = null) => ({
  type: 'SET_MODAL',
  isDisplayed,
  modalType,
  text
});