export const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.projects;
    case 'REMOVE_PROJECT':
      return state.filter(project => {
        return project.id !== action.id;
      });
    case 'UPDATE_PROJECTS':
      return state.map(project => {
        if (project.id === action.id) {
          return { ...project, name: action.editedName };
        }
        return project;
      });
    default:
      return state;
  }
}