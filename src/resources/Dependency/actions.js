import { SET_DEPENDENCIES } from './actionTypes';
import request from '@utils/request';

const fetchDependenciesLatest = packages => dispatch =>
	request('get', `https://npm-registry-proxy.glitch.me/${packages}/latest`)
		.then(response => {
			dispatch({
				type: SET_DEPENDENCIES,
				payload: response.data
			});
			return Promise.resolve(response);
		})
		.catch(err => {
			return Promise.reject(err);
		});

export { fetchDependenciesLatest };
