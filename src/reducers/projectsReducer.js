export const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.projects;
    case 'ADD_PROJECT':
      return [...state, action.project];
    case 'REMOVE_PROJECT':
      return state.filter(project => {
        return project.id !== action.id;
      });
    case 'UPDATE_PROJECT':
      return state.map(project => {
        if (project.id === action.id) {
          return { ...project, name: action.name };
        }
        return project;
      });
    default:
      return state;
  }
}