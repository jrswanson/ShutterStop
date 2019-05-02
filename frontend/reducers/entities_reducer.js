import { combineReducers } from 'redux';

import { usersReducer } from './entities/users_reducer';
import { photosReducer } from './entities/photos_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    photos: photosReducer
});

export default entitiesReducer;