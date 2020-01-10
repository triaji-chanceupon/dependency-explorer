import React, { Component } from 'react';
import './assets/section.scss';

class Section extends Component {
	handleClick() {
		const { onClick } = this.props;
		if (onClick) {
			onClick();
		}
	}

	renderPadding() {
		const { padding } = this.props;

		if (padding) {
			if (padding.x) {
				switch (padding.x) {
					case 'lg':
						return 'hi-section-px-lg';
					case 'xl':
						return 'hi-section-px-xl';
					default:
						return 'hi-section-px-md';
				}
			}

			if (padding.y) {
				switch (padding.y) {
					case 'lg':
						return 'hi-section-py-lg';
					case 'xl':
						return 'hi-section-py-xl';
					default:
						return 'hi-section-py-md';
				}
			}
		} else {
			return '';
		}
	}

	render() {
		const { children, className, sub, onClick, style } = this.props;
		return (
			<section
				style={style ? style : {}}
				className={`hi-section ${this.renderPadding()} ${
					sub ? 'hi-sub-section' : ''
				} ${className ? className : ''} ${
					onClick ? 'hi-section-clickable' : ''
				}`}
				onClick={this.handleClick.bind(this)}>
				{children}
			</section>
		);
	}
}

export default Section;
