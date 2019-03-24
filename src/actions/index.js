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

export const setPalettes = (projectID, palettes) => ({
  type: 'SET_PALETTES',
  projectID,
  palettes
});

export const setModal = (
  isDisplayed,
  modalType = null,
  currentName = null,
  projectID = null,
  paletteID = null
) => ({
  type: 'SET_MODAL',
  isDisplayed,
  modalType,
  currentName,
  projectID,
  paletteID
});

export const removeProject = (id) => ({
  type: 'REMOVE_PROJECT',
  id
});

export const updateProjects = (id, editedName) => ({
  type: 'UPDATE_PROJECTS',
  id,
  editedName
});