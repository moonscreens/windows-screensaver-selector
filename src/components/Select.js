import React from 'react';
import styled from '@emotion/styled';

import { inset_window_shadow } from './Styles';

const SelectEle = styled.div`
    ${inset_window_shadow}
    background: white;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px inset #C0C0C0;
    outline: none;

    width: 178px;

    &:focus-within > .dropdown__selected, &:focus > .dropdown__selected, &.active > .dropdown__selected {
        border: 1px dotted white;
        background-color: #000080;
        color: white;
	}

	.dropdown__icon {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAIAAABbzbuTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABoSURBVDhPYzxw4AAD0cDBwYEBqOE/caChoQGohwWi9eDBgxAGQcAEpYkGtNcA9QMEgAIBA6AFI4oNmEGMKYLuJGQVmKqBAIsfIOqwqgYC7J7GpRoISA6lQagBlLzxeBENQBIsKYCBAQDIeUi9MitYJgAAAABJRU5ErkJggg==);
		width: 18px;
		height: 17px;
	}

	.dropdown__selected {
		background: white;
		padding: 3px 1px;
		line-height: 1;
		margin: 1px;
		width: 100%;
		border: 1px solid transparent;
	}

	.dropdown__options {
		display: none;
		position: absolute;
		left: 0;
		top: 100%;
		
		width: 100%;

		background: white;
		border: 1px solid black;
		height: auto;
		z-index: 9999;
	}
	&.active {
		.dropdown__options {
			display: block;
		}
	}

	.dropdown__option {
		border: 1px solid transparent;
		padding: 1px 3px;
		&:hover {
			background: #000080;
			border: 1px dotted white;
			color: white;
		}
	}
`;

class Select extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			active: false,
			options: [],
			selected: this.props.selected,
		}

		for (let index = 0; index < props.options.length; index++) {
			const name = props.options[index];

			this.state.options[index] = <div
				key={index}
				data-key={index}
				value={name}
				className="dropdown__option">
				{name}
			</div>
		}

		this.windowClickListenerBound = this.windowClickListener.bind(this);
	}

	componentDidMount () {
		window.addEventListener('click', this.windowClickListenerBound);
	}
	componentWillUnmount () {
		window.removeEventListener('click', this.windowClickListenerBound);
	}
	

	windowClickListener (e) {
		if (this.state.active && !e.target.className.includes('dropdown__')) {
			this.setState({
				active: false,
			})
		}
	}

	clickListener (e) {
		if (e.target.classList.contains('dropdown__option')) {
			this.setState({
				selected: Number(e.target.dataset.key),
				active: false,
			});
			if (this.props.onChange) {
				this.props.onChange({
					key: Number(e.target.dataset.key),
					value: this.props.options[Number(e.target.dataset.key)],
				})
			}
		} else {
			this.setState({
				active: !this.state.active,
			})
		}
	}

	render () {
		return <SelectEle className={this.state.active ? 'active ' : ' '} onClick={this.clickListener.bind(this)}>
			<div className="dropdown__selected">
				{this.props.options[this.state.selected]}
			</div>
			<div className="dropdown__icon"></div>
			<div className="dropdown__options">
				{this.state.options}
			</div>
		</SelectEle>
	}
}


Select.defaultProps = {
	options: [],
	selected: 0,
}

export default Select;
