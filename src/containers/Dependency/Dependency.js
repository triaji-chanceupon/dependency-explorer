import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Spin } from 'antd';
import { Container, Text, Title } from '@components';
import { fetchDependenciesLatest } from '@resources/Dependency/actions';
import { Link } from 'react-router-dom';
import './assets/dependency.scss';

class Dependency extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetching: true,
			dependencies: []
		};
	}

	componentDidMount() {
		const { match } = this.props;
		this.fetchDependencies(match.params.package);
	}

	fetchDependencies(packag) {
		const { dispatch } = this.props;
		const { dependencies } = this.state;
		this.setState({ fetching: true });
		dispatch(fetchDependenciesLatest(encodeURIComponent(packag)))
			.then(deps => {
				if (deps.data.dependencies) {
					for (var dependency in deps.data.dependencies) {
						if (dependencies.indexOf(dependency) === -1) {
							dependencies.push(dependency);
						}
						this.fetchDependencies(dependency);
					}
				}

				this.setState({ fetching: false, dependencies });
			})
			.catch(error => this.setState({ fetching: false }));
	}

	renderDependencies() {
		const { match } = this.props;
		const { dependencies } = this.state;
		return (
			<React.Fragment>
				<Text>
					Found <strong>{dependencies.length}</strong> dependencies
					for <strong>{match.params.package}</strong>
				</Text>
				<ul>
					{dependencies.map(dependency => (
						<li key={dependency}>{dependency}</li>
					))}
				</ul>
			</React.Fragment>
		);
	}

	renderResults() {
		const { match } = this.props;
		const { dependencies } = this.state;

		return dependencies.length > 0 ? (
			this.renderDependencies()
		) : (
			<Text>There are no dependencies for "{match.params.package}"</Text>
		);
	}

	render() {
		const { match } = this.props;
		const { fetching } = this.state;
		return (
			<Container className='dependency-container'>
				<Text className='mt-4 mb-4'>
					<Link to='/'>DEPENDENCY EXPLORER</Link>
				</Text>
				<Title className='dependency-title'>PACKAGE OVERVIEW</Title>
				<Title size='xs' className='dependency-title mb-5'>
					{match.params.package}
				</Title>

				{fetching ? <Spin /> : this.renderResults()}
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		dependencies: state.dependencies
	};
};

export default connect(mapStateToProps)(Dependency);
