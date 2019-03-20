import { postPalette } from './postPalette';
import { postProject } from './postProject';
import { toggleLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const saveNewPalette = (projectName, paletteName, projects, colors) => {
  return async dispatch => {
    dispatch(toggleLoading(true));
    try {
      if (projects.some(project => project.name === projectName)) {
        const url = `/api/v1/projects/?name=${projectName}`
        const [foundProject] = await fetchData(url);
        const { id: projectID } = foundProject;
        await dispatch(postPalette(projectID, paletteName, colors))
      } else {
        await dispatch(postProject(projectName, paletteName, colors));
      }
    } catch (error) {
      dispatch(setError(error.message)); 
    }
    dispatch(toggleLoading(false));
  };
};