import { setError, toggleLoading, removeProject, setModal } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const options = createOptions('DELETE');  
      await fetchData(`/api/v1/projects/${id}`, options);
      dispatch(removeProject(id));
      dispatch(setModal(false));
    } catch (error) {
      dispatch(setError('Error deleting project: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}