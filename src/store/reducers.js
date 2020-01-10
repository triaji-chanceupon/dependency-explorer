import { combineReducers } from 'redux';
import { resourceReducers } from '@resources/reducers';

let reducer = resourceReducers;

const rootReducer = combineReducers({
	...reducer
});

export default rootReducer;
