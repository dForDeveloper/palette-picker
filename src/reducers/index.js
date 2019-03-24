import { combineReducers } from 'redux';
import { colorsReducer } from './colorsReducer';
import { lockedColorsReducer } from './lockedColorsReducer';
import { projectsReducer } from './projectsReducer';
import { palettesReducer } from './palettesReducer';
import { loadingReducer } from './loadingReducer';
import { errorReducer } from './errorReducer';
import { modalReducer } from './modalReducer';

export const rootReducer = combineReducers({
  colors: colorsReducer,
  lockedColors: lockedColorsReducer,
  projects: projectsReducer,
  palettes: palettesReducer,
  loading: loadingReducer,
  error: errorReducer,
  modal: modalReducer
});