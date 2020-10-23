import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

// user public profile
export const getPublicProfile = (username) => {
	return fetch(`${API}/user/${username}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
			// 'Content-Type': 'application/json', got rid of this because we're sending files (form-data)
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

export const getProfile = (token) => {
	return fetch(`${API}/user/profile`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			// 'Content-Type': 'application/json', got rid of this because we're sending files (form-data)
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

export const update = (token, user) => {
	return fetch(`${API}/user/update`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			// 'Content-Type': 'application/json', got rid of this because we're sending files (form-data)
			Authorization: `Bearer ${token}`
		},
		body: user
	})
		.then((response) => {
			handleResponse(response);
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};
