import { setError, addProject } from '../actions';
import { postPalette } from './postPalette';
import { fetchData, createOptions } from '../utils/api';

export const postProject = (projectName, paletteName, colors) => {
  return async (dispatch) => {
    try {
      const options = createOptions('POST', { name: projectName });
      const { id: projectID } = await fetchData('/api/v1/projects', options);
      dispatch(addProject({ id: projectID, name: projectName }));
      await dispatch(postPalette(projectID, paletteName, colors));
    } catch (error) {
      dispatch(setError('Error adding project: ' + error.message));
    }
  }
}