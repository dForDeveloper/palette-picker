import { fetchData } from '../utils/api';
import { toggleLoading, setError, setPalettes } from '../actions';

export const getPalettes = (id) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const palettes = await fetchData(`/api/v1/projects/${id}/palettes`);
      dispatch(setPalettes(id, palettes));
    } catch (error) {
      dispatch(setError('Error getting palettes: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
};