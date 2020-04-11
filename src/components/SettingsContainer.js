import React from 'react';
import { css } from 'emotion';

import { border_ridge } from './Styles';


class SettingsContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render () {
		return <div className={css`
			${border_ridge}
			margin-top: 10px;
			padding: 10px 7px;
			position: relative;
		`}>
			
			<div className={css`
				position: absolute;
				top: -6px;
				left: 6px;
				padding: 0 3px;
				background: #C0C0C0;
				&::first-letter {
					text-decoration: underline;
				}
			`}>
				{this.props.title}
			</div>

			{this.props.children}
		</div>
	}
}

SettingsContainer.defaultProps = {
	title: 'Untitled',
}

export default SettingsContainer;