import {createStore, combineReducers, applyMiddleware} from 'redux';

import profileReducer from './profile-reducer.js'
import usersReducer from './users-reducer.js'
import authReducer from './auth-reducer.js'
import ReduxThunk from 'redux-thunk'


let state = combineReducers({
	profilePage: profileReducer,
	usersPage: usersReducer,
	auth: authReducer
})

let reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = createStore(state, applyMiddleware(ReduxThunk))

export {store}