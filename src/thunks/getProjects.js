import { setProjects, toggleLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const getProjects = () => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const projects = await fetchData('/api/v1/projects');
      dispatch(setProjects(projects));
    } catch (error) {
      dispatch(setError('Error getting projects: ' + error.message));
    }
    dispatch(toggleLoading(false))
  }
}