import { setError, toggleLoading, setModal } from '../actions';
import { fetchData, createOptions } from '../utils/api';
import { getPalettes } from './getPalettes';

export const patchPalette = (projectID, paletteID, editedName) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const options = createOptions('PATCH', { id: paletteID, editedName });
      await fetchData(`/api/v1/palettes/${paletteID}`, options);
      await dispatch(getPalettes(projectID));
      dispatch(setModal(false));
    } catch (error) {
      dispatch(setError('Error updating palette: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}