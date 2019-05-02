import { combineReducers } from 'redux';

import { sessionErrorsReducer } from './errors/session_errors_reducer';
import { photosErrorsReducer } from './errors/photo_errors_reducer';

const errorsReducer = combineReducers({
    login: sessionErrorsReducer,
    photo: photosErrorsReducer
});

export default errorsReducer;