import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './assets/scss/bootstrap/index.scss';
import './assets/less/antd/index.less';
import './assets/scss/index.scss';

import App from '@containers/App';

import * as serviceWorker from './serviceWorker';

import configureStore from './store/configureStore';
import initialState from './store/initialState';

import { PersistGate } from 'redux-persist/integration/react';

const store = configureStore(initialState);

window.persistor = store.persistor;
ReactDOM.render(
	<Provider store={store.store}>
		<PersistGate loading={null} persistor={window.persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
