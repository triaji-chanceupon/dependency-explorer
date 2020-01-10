import React, { Component } from 'react';
import './assets/text.scss';

class Text extends Component {
	render() {
		const {
			children,
			type,
			size,
			className,
			style,
			dangerouslySetInnerHTML
		} = this.props;

		const renderType = () => {
			switch (type) {
				case 'primary':
					return 'hi-text-primary';
				case 'bold':
					return 'hi-text-bold';
				case 'extrabold':
					return 'hi-text-extrabold';
				case 'default':
					return 'hi-text-default';
				default:
					return 'hi-text-default';
			}
		};

		const renderSize = () => {
			switch (size) {
				case 'sm':
					return 'hi-text-sm';
				case 'md':
					return 'hi-text-md';
				case 'lg':
					return 'hi-text-lg';
				case 'xl':
					return 'hi-text-xl';
				case 'xxl':
					return 'hi-text-xxl';
				case 'xxxl':
					return 'hi-text-xxxl';
				default:
					return 'hi-text-md';
			}
		};

		if (dangerouslySetInnerHTML) {
			return (
				<div
					className={`hi-text ${renderType()} ${renderSize()}
						${className ? className : ''}`}
					style={style ? style : {}}
					dangerouslySetInnerHTML={dangerouslySetInnerHTML}
				/>
			);
		}

		return (
			<div
				className={`hi-text ${renderType()} ${renderSize()}
						${className ? className : ''}`}
				style={style ? style : {}}>
				{children}
			</div>
		);
	}
}

export default Text;
