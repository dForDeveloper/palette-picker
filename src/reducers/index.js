import { combineReducers } from 'redux';
import { colorsReducer } from './colorsReducer';
import { lockedColorsReducer } from './lockedColorsReducer';
import { projectsReducer } from './projectsReducer';
import { loadingReducer } from './loadingReducer';
import { errorReducer } from './errorReducer';

export const rootReducer = combineReducers({
  colors: colorsReducer,
  lockedColors: lockedColorsReducer,
  projects: projectsReducer,
  loading: loadingReducer,
  error: errorReducer
});