import { setError } from '../actions';
import { fetchProjects } from './fetchProjects';
import { fetchData, createOptions } from '../utils/api';

export const postPalette = (projectID, name, colors) => {
  return async (dispatch) => {
    try {
      const project_id = parseInt(projectID);
      const [color1, color2, color3, color4, color5] = colors;
      const palette = {
        name,
        project_id,
        color1,
        color2,
        color3,
        color4,
        color5
      };
      const options = createOptions('POST', palette);
      await fetchData('/api/v1/palettes', options);
      await dispatch(fetchProjects());
    } catch (error) {
      dispatch(setError('Error adding palette: ' + error.message));
    }
  }
}