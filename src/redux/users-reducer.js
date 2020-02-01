import React from 'react';
import api from './../API/api.js'

let data = {
	users: [{
		name: null,
		photos: {
			small: null,
			large: null
		},
		status: null,
		followed: false
	}],
	count: 10,
	page: 1,
	totalCount: 100,
	isFetching: false,
	FollowingInProcess: []
}

let usersReducer = (state = data, action) => {
	switch (action.type) {
		case 'ADD-USERS': {
			let newState = {...state};
			newState.users = action.data;
			return newState;
		}
		case 'ADD-TOTAL-COUNT': {
			let newState = {...state};
			newState.totalCount = action.data;
			return newState;
		}
		case 'CHANGE-PAGE': {
			let newState = {...state};
			newState.page = action.data;
			return newState;
		}
		case 'FOLLOW': {
			let newState = {...state};
			for(let i = 0; i <= newState.users.length; i++){
				if(newState.users[i].id == action.id){
					newState.users[i].followed = true;
					break
				}
			}
			return newState;
		}
		case 'UNFOLLOW': {
			let newState = {...state};
			for(let i = 0; i <= newState.users.length; i++){
				if(newState.users[i].id == action.id){
					newState.users[i].followed = false;
					break
				}
			}
			return newState;
		}
		case 'ON-FETCHING': {
			let newState = {...state};
			newState.isFetching = true;
			return newState;
		}
		case 'OFF-FETCHING': {
			let newState = {...state};
			newState.isFetching = false;
			return newState;
		}
		case 'TOGGLE-FOLLOWING-IN-PROCESS': {
			return {
				...state,
				FollowingInProcess: action.value
				? [...state.FollowingInProcess, action.id]
				: state.FollowingInProcess.filter((id) => id != action.id)
			}
		}
		default: 
			return state
	}
}


export const addUsers = (users) => {
	return {type: "ADD-USERS", data: users}
}
export const addTotalCount = (totalCount) => {
	return{type: 'ADD-TOTAL-COUNT', data: totalCount}
}
export const changePage = (i) => {
	return {type: 'CHANGE-PAGE', data: i}
}
export const follow = (id) => {
	return {type: 'FOLLOW', id: id}
}
export const unfollow = (id) => {
	return {type: 'UNFOLLOW', id: id}
}
export const onFetching = () => {
	return {type: 'ON-FETCHING'}
}
export const offFetching = () => {
	return {type: 'OFF-FETCHING'}
}
export const toggleFollowingInProcess = (id, value) => {
	return {type: 'TOGGLE-FOLLOWING-IN-PROCESS', id: id, value: value}
}

export const getUsers = (count, page) => (dispatch) => {
	api.getUsers(count, page).then((data) => {
			dispatch(offFetching());
			dispatch(addTotalCount(data.totalCount));
			dispatch(addUsers(data.items));
		})
}

export const subscribe = (id) => (dispatch) => {
	dispatch(toggleFollowingInProcess(id, true))
	api.subscribe(id).then((data) => {
		if(data.resultCode === 0){
			dispatch(follow(id))
			dispatch(toggleFollowingInProcess(id, false))
		}
	});
}
export const unsubscribe = (id) => (dispatch) => {
	dispatch(toggleFollowingInProcess(id, true))
	api.unsubscribe(id).then((data) => {
			if(data.resultCode === 0){
				dispatch(unfollow(id))
				dispatch(toggleFollowingInProcess(id, false))
			}
		});
}

export default usersReducer;