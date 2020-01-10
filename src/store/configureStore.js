/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const whitelist = [];
let transforms = [];

const persistConfig = {
	key: 'root',
	storage,
	whitelist,
	stateReconciler: autoMergeLevel2,
	transforms
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
	middleware = [...middleware];
}

export default function configureStore(initialState) {
	const store = createStore(
		persistedReducer,
		initialState,
		applyMiddleware(...middleware)
	);
	const persistor = persistStore(store);
	return { store, persistor };
}
