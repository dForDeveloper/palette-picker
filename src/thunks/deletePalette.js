import { setError, toggleLoading, setModal, removePalette } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const deletePalette = (projectID, paletteID) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const options = createOptions('DELETE');
      await fetchData(`/api/v1/palettes/${paletteID}`, options);
      dispatch(removePalette(projectID, paletteID));
      dispatch(setModal(false));
    } catch (error) {
      dispatch(setError('Error deleting palette: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}