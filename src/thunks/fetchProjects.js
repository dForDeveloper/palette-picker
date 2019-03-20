import { setProjects, toggleLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const fetchProjects = () => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
      const projects = await fetchData('/api/v1/projects');
      dispatch(setProjects(projects));
    } catch (error) {
      dispatch(setError('Error fetch projects: ' + error.message));
    }
    dispatch(toggleLoading(false))
  }
}