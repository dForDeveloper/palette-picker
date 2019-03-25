import { setError, toggleLoading, setModal, updatePalette } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const patchPalette = (projectID, paletteID, name) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const options = createOptions('PATCH', { name });
      await fetchData(`/api/v1/palettes/${paletteID}`, options);
      dispatch(updatePalette(projectID, paletteID, name));
      dispatch(setModal(false));
    } catch (error) {
      dispatch(setError('Error updating palette: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}