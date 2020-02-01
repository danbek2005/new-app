import React from 'react';
import api from '../API/api.js';

let data = {
	userId: 1,
	fullName: 'Danil',
	aboutMe: 'I am danil',
	contacts: {
		facebook: 'www.facebook'
	},
	lookingForAJob: true,
	lookingForAJobDescription: 'Хочу быть фрилансером и получать $100.000',
	photos: {
		small: null,
		large: null
	},
	isFetching: false
}

let profileReducer = (state = data, action) => {
	switch (action.type) {
		case 'ADD-PROFILE': {
			let newState = action.data;
			newState.isFetching = false;
			return newState
		}
		case 'ON-PROFILE-FETCHING': {
			let newState = {...state};
			newState.isFetching = true;
			return newState;
		}
		case 'OFF-PROFILE-FETCHING': {
			let newState = {...state};
			newState.isFetching = false;
			return newState;
		}
		default:
			return state;
	}
}

export const addProfile = (profile) => {
	return {type: 'ADD-PROFILE', data: profile}
}

export const onProfileFetching = () => {
	return {type: 'ON-PROFILE-FETCHING'}
}
export const offProfileFetching = () => {
	return {type: 'OFF-PROFILE-FETCHING'}
}

export const getProfile = (userId) => (dispatch) => {
	dispatch(onProfileFetching())
	api.getProfile(userId).then((data) => {
		dispatch(offProfileFetching())
		dispatch(addProfile(data))
	})
}


export default profileReducer;
