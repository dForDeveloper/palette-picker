export const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.projects;
    case 'SET_PALETTES':
      const newState =  state.map(project => {
        if (project.id === parseInt(action.id)) {
          return { ...project, palettes: action.palettes }
        }
        return project;
      });
      return newState;
    default:
      return state;
  }
}