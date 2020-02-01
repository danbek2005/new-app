import React from 'react';

let data = {
	id: 1,
	login: null,
	email: null,
	isAuth: false
}

let authReducer = (state = data, action) => {
	switch (action.type) {
		case 'AUTH': {
			return {
				...state,
				...action.data,
				isAuth: true
			}
		}
		default:
			return state;
	}
}

export const auth = (data) => {
	return {type: 'AUTH', data: data}
}


export default authReducer;
