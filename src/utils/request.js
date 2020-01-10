import axios from 'axios';

axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

export default (method, url, data, config) => {
	if (['get', 'delete'].indexOf(method) >= 0) {
		// Add request params if method is get
		data = Object.assign({}, data, config);
		return axios[method](url, data);
	}

	return axios[method](url, data, config);
};
