import { setError, toggleLoading } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const deletePalette = () => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
    
    } catch (error) {
      dispatch(setError('Error deleting project: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}