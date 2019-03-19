import { combineReducers } from 'redux';
import { colorsReducer } from './colorsReducer';
import { lockedColorsReducer } from './lockedColorsReducer';

export const rootReducer = combineReducers({
  colors: colorsReducer,
  lockedColors: lockedColorsReducer
});