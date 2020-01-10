import { SET_PACKAGES } from './actionTypes';
import request from '@utils/request';

const fetchPackageSuggestions = query => dispatch =>
	request(
		'get',
		`https://npm-registry-proxy.glitch.me/search/suggestions?q=${query}`
	)
		.then(response => {
			dispatch({
				type: SET_PACKAGES,
				payload: response.data
			});
			return Promise.resolve(response);
		})
		.catch(err => {
			return Promise.reject(err);
		});

export { fetchPackageSuggestions };
