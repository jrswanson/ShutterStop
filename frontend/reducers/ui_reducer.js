import { combineReducers } from 'redux';

import { modalReducer } from './ui/modal_reducer';

const uiReducer = combineReducers({
    modal: modalReducer 
});

export default uiReducer;