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

export const addProject = (project) => ({
  type: 'ADD_PROJECT',
  project
});

export const updateProject = (id, name) => ({
  type: 'UPDATE_PROJECT',
  id,
  name
});

export const removeProject = (id) => ({
  type: 'REMOVE_PROJECT',
  id
});

export const setPalettes = (projectID, palettes) => ({
  type: 'SET_PALETTES',
  projectID,
  palettes
});

export const addPalette = (projectID, palette) => ({
  type: 'ADD_PALETTE',
  projectID,
  palette
});

export const updatePalette = (projectID, paletteID, name) => ({
  type: 'UPDATE_PALETTE',
  projectID,
  paletteID,
  name
});

export const removePalette = (projectID, paletteID) => ({
  type: 'REMOVE_PALETTE',
  projectID,
  paletteID
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

export const toggleLoading = (bool) => ({
  type: 'TOGGLE_LOADING',
  bool
});

export const setError = (message) => ({
  type: 'SET_ERROR',
  message
});