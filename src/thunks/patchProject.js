import { setError, toggleLoading, updateProjects, setModal } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const patchProject = (id, editedName) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const options = createOptions('PATCH', { id, editedName });
      await fetchData(`/api/v1/projects/${id}`, options);
      dispatch(updateProjects(id, editedName));
      dispatch(setModal(false));
    } catch (error) {
      dispatch(setError('Error updating project: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}