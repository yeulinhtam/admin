import { combineReducers } from 'redux';
import postsReducer from './posts';
import categoriesReducer from './categories';
import calendarReducer from './calendar';
import userReducer from './user';

const rootReducer = combineReducers({
   posts: postsReducer,
   categories: categoriesReducer,
   calendar: calendarReducer,
   user: userReducer
});

export default rootReducer;