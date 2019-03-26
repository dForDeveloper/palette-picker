import { setError, toggleLoading, updateProject, setModal } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const patchProject = (id, name) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const options = createOptions('PATCH', { name });
      await fetchData(`/api/v1/projects/${id}`, options);
      dispatch(updateProject(id, name));
      dispatch(setModal(false));
    } catch (error) {
      dispatch(setError('Error updating project: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}