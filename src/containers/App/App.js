import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import Package from '@containers/Package';
import Dependency from '@containers/Dependency';

class App extends Component {
	render() {
		let basename = '';
		return (
			<Suspense fallback={<div>Loading</div>}>
				<Helmet titleTemplate='Dependency Explorer | %s'></Helmet>
				<BrowserRouter basename={basename}>
					<React.Fragment>
						<Route
							exact
							path='/'
							component={Package}
							{...this.props}
						/>
						<Route
							exact
							path='/:package'
							component={Dependency}
							{...this.props}
						/>
					</React.Fragment>
				</BrowserRouter>
			</Suspense>
		);
	}
}

export default App;
