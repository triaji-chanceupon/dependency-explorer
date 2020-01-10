import {
	SET_PACKAGES,
	SET_PACKAGE,
	CLEAR_PACKAGES,
	CLEAR_PACKAGE,
	ADD_PACKAGE,
	UPDATE_PACKAGE,
	REMOVE_PACKAGE
} from './actionTypes';

export const packag = (state = {}, action) => {
	switch (action.type) {
		case SET_PACKAGE:
			return action.payload;
		case UPDATE_PACKAGE:
			if (state._id.toString() !== action.payload._id.toString()) {
				return state;
			}

			// Otherwise, this is the one we want - return an updated value
			return {
				...state,
				...action.payload
			};
		case CLEAR_PACKAGE:
			return {};
		default:
			return state;
	}
};

export default (state = [], action) => {
	switch (action.type) {
		case SET_PACKAGES:
			return action.payload;
		case ADD_PACKAGE:
			return [...state, action.payload];
		case UPDATE_PACKAGE:
			return state.map(item => {
				if (item._id !== action.payload._id) {
					return item;
				}

				// Otherwise, this is the one we want - return an updated value
				return {
					...item,
					...action.payload
				};
			});
		case REMOVE_PACKAGE:
			return state.filter(item => {
				return item._id !== action.payload._id;
			});
		case CLEAR_PACKAGES:
			return [];
		default:
			return state;
	}
};
