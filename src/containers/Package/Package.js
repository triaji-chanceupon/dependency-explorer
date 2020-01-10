import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, Row, Select, Spin } from 'antd';
import { Container, Title } from '@components';
import { fetchPackageSuggestions } from '@resources/Package/actions';
import { isEmpty } from 'lodash';
import './assets/package.scss';
const FormItem = Form.Item;

const Option = Select.Option;

class Package extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetching: false,
			packages: []
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.packages !== prevProps.packages) {
			this.setState({
				packages: this.props.packages
			});
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.history.push(
					`/${encodeURIComponent(values.package)}`
				);
			}
		});
	};

	handleSuggest = inputValue => {
		const { dispatch } = this.props;
		const formValues = this.props.form.getFieldsValue();

		dispatch(fetchPackageSuggestions(inputValue))
			.then(res => {
				this.props.form.setFieldsValue(formValues);
			})
			.catch(err => console.log(err));
	};

	optionsPackage() {
		const { packages } = this.state;

		if (!isEmpty(packages) && packages.length > 0) {
			return packages.map((packag, index) => {
				return (
					<Option
						value={packag.name}
						key={`packag-${index}`}
						title={packag.name}>
						{packag.name}
					</Option>
				);
			});
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { fetching } = this.state;
		return (
			<Container className='package-container'>
				<Title className='package-title'>DEPENDENCY EXPLORER</Title>

				<Form onSubmit={this.handleSubmit}>
					<Row gutter={24} className='mb-5'>
						<Col
							xs={19}
							sm={{ offset: 2, span: 17 }}
							md={{ offset: 4, span: 15 }}>
							<FormItem>
								{getFieldDecorator('package', {
									rules: [
										{
											required: true,
											message: 'Please enter a package'
										}
									]
								})(
									<Select
										allowClear={true}
										showSearch
										onSearch={this.handleSuggest.bind(this)}
										onFocus={() => {
											if (
												!this.state.autocompleteDisabled
											) {
												let i;
												const el = document.getElementsByClassName(
													'ant-select-search__field'
												);
												for (
													i = 0;
													i < el.length;
													i++
												) {
													el[i].setAttribute(
														'autocomplete',
														'registration-select'
													);
												}
												this.setState({
													autocompleteDisabled: true
												});
											}
										}}
										placeholder='Please enter a package'
										notFoundContent={
											fetching ? (
												<Spin size='small' />
											) : null
										}
										style={{ width: '100%' }}
										optionFilterProp='title'
										filterOption={(input, option) =>
											option.props.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >=
											0
										}>
										{this.optionsPackage()}
									</Select>
								)}
							</FormItem>
						</Col>
						<Col xs={5} sm={5} md={5}>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button mt-2'>
								SEARCH
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		);
	}
}

const PacakageAntD = Form.create({
	mapPropsToFields(props) {}
})(Package);

const mapStateToProps = state => {
	return {
		packages: state.packages
	};
};

export default connect(mapStateToProps)(PacakageAntD);
