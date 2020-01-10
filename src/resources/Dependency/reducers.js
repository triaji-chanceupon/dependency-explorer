import {
	SET_DEPENDENCIES,
	SET_DEPENDENCY,
	CLEAR_DEPENDENCIES,
	CLEAR_DEPENDENCY,
	ADD_DEPENDENCY,
	UPDATE_DEPENDENCY,
	REMOVE_DEPENDENCY
} from './actionTypes';

export const dependency = (state = {}, action) => {
	switch (action.type) {
		case SET_DEPENDENCY:
			return action.payload;
		case UPDATE_DEPENDENCY:
			if (state._id.toString() !== action.payload._id.toString()) {
				return state;
			}

			// Otherwise, this is the one we want - return an updated value
			return {
				...state,
				...action.payload
			};
		case CLEAR_DEPENDENCY:
			return {};
		default:
			return state;
	}
};

export default (state = [], action) => {
	switch (action.type) {
		case SET_DEPENDENCIES:
			return action.payload;
		case ADD_DEPENDENCY:
			return [...state, action.payload];
		case UPDATE_DEPENDENCY:
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
		case REMOVE_DEPENDENCY:
			return state.filter(item => {
				return item._id !== action.payload._id;
			});
		case CLEAR_DEPENDENCIES:
			return [];
		default:
			return state;
	}
};
