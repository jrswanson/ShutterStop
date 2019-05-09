import { combineReducers } from 'redux';

import { usersReducer } from './entities/users_reducer';
import { photosReducer } from './entities/photos_reducer';
import { followsReducer } from './entities/follows_reducer';
import { likesReducer } from './entities/likes_reducer';
import { commentsReducer } from './entities/comments_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    photos: photosReducer,
    follows: followsReducer,
    likes: likesReducer,
    comments: commentsReducer
});

export default entitiesReducer;