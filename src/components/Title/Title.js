import React, { Component } from 'react';
import './assets/title.scss';

class Title extends Component {
	handleClick() {
		const { onClick } = this.props;

		if (onClick) {
			onClick();
		}
	}

	render() {
		const {
			children,
			type,
			size,
			className,
			onClick,
			bold,
			leagueGothic
		} = this.props;

		const renderType = () => {
			switch (type) {
				case 'primary':
					return 'hi-title-primary';
				case 'secondary':
					return 'hi-title-secondary';
				case 'thin':
					return 'hi-title-thin';
				case 'link':
					return 'hi-title-link';
				case 'main':
					return 'hi-title-main';
				case 'sub':
					return 'hi-title-sub';
				case 'error':
					return 'hi-title-error';
				default:
					return '';
			}
		};

		const renderSize = () => {
			switch (size) {
				case 'xs':
					return 'hi-title-xs';
				case 'sm':
					return 'hi-title-sm';
				case 'md':
					return 'hi-title-md';
				case 'lg':
					return 'hi-title-lg';
				case 'xl':
					return 'hi-title-xl';
				case 'xxl':
					return 'hi-title-xxl';
				case 'xxxl':
					return 'hi-title-xxxl';
				default:
					return 'hi-title-md';
			}
		};

		return (
			<div
				className={`hi-title ${
					bold ? 'hi-title-bold' : ''
				} ${renderType()} ${renderSize()} ${
					className ? className : ''
				} ${onClick ? 'hi-title-pointer' : ''} ${
					leagueGothic ? 'hi-title-league-gothic' : ''
				}`}
				onClick={this.handleClick.bind(this)}>
				{children}
			</div>
		);
	}
}

export default Title;
