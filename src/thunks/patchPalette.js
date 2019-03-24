import { setError, toggleLoading } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const patchPalette = () => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
    
    } catch (error) {
      dispatch(setError('Error updating palette: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}