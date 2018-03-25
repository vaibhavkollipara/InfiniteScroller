import { combineReducers } from 'redux';
import flickerReducer from './FlickerReducer';

export default combineReducers({
    flicker : flickerReducer
});
