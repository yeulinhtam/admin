import { combineReducers } from 'redux';
import postsReducer from './posts';
import categoriesReducer from './categories';

const rootReducer = combineReducers({
   posts: postsReducer,
   categories: categoriesReducer
});

export default rootReducer;