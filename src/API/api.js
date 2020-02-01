import React from 'react';
import axios from 'axios';


let instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "c4ed55b6-269e-4d7b-87fc-be1f5a2dd0fa"
	}
})

const api = {
	getUsers: (count, page) => {
		return instance.get('users?count=' + count + "&page=" + page).then(res => res.data);
	},
	getProfile: (id, addProfile, offFetching) => {
		return instance.get('profile/' + id).then(res => res.data);
	},
	getAuth: (auth) => {
		instance.get('auth/me')
		.then((res) => {
			if(res.data.resultCode === 0){
				auth(res.data.data)
			}
		})
	},
	subscribe: (userId) => {
		return instance.post('follow/' + userId).then(res => res.data);
	},
	unsubscribe: (userId) => {
		return instance.delete('follow/' + userId).then(res => res.data);
	}
}

export default api