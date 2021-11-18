import React from 'react';
import styled from '@emotion/styled';

const SelectEle = styled.div`
	font-family: "Pixelated MS Sans Serif",Arial;
	-webkit-font-smoothing: none;
	font-size: 11px;

	padding: 3px 4px;
	box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
	background-color: #fff;
	box-sizing: border-box;

	min-width: 173px;

	appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    padding-right: 32px;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 0H0v16h1V1h14V0z' fill='%23DFDFDF'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 1H1v14h1V2h12V1H2z' fill='%23fff'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16 17H0v-1h15V0h1v17z' fill='%23000'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 1h-1v14H1v1h14V1z' fill='gray'/%3E%3Cpath fill='silver' d='M2 2h12v13H2z'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 6H4v1h1v1h1v1h1v1h1V9h1V8h1V7h1V6z' fill='%23000'/%3E%3C/svg%3E");
    background-position: top 2px right 2px;
    background-repeat: no-repeat;
	border-radius: 0;
	
	height: 21px;
	

    &:focus-within > .dropdown__selected, &:focus > .dropdown__selected, &.active > .dropdown__selected {
        border: 1px dotted white;
        background-color: #000080;
        color: white;
	}

	.dropdown__selected {
		background: white;
		padding: 1px 1px;
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
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			selected: this.props.selected,
		}

		this.windowClickListenerBound = this.windowClickListener.bind(this);
	}

	componentDidMount() {
		window.addEventListener('click', this.windowClickListenerBound);
	}
	componentWillUnmount() {
		window.removeEventListener('click', this.windowClickListenerBound);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.selected !== this.props.selected) {
			this.setValue(this.props.selected);
		}
	}

	setValue(value) {
		this.setState({
			selected: value,
		});
	}

	windowClickListener(e) {
		if (this.state.active && !e.target.className.includes('dropdown__')) {
			this.setState({
				active: false,
			})
		}
	}

	clickListener(e) {
		e.stopPropagation();
		if (!this.state.active) {
			this.setState({
				active: true,
			});
		} else if (e.target.classList.contains('dropdown__option')) {
			this.setState({
				selected: e.target.textContent,
				active: false,
			});
			if (this.props.onChange) {
				this.props.onChange(e.target.textContent)
			}
		} else {
			this.setState({
				active: false,
			})
		}
	}

	render() {
		const options = [];
		for (let index = 0; index < this.props.options.length; index++) {
			const name = this.props.options[index];
			options[index] = <div
				key={index}
				data-key={index}
				value={name}
				className="dropdown__option">
				{name}
			</div>
		}
		return <SelectEle className={this.state.active ? 'active ' : ' '} onClick={this.clickListener.bind(this)}>
			<div className="dropdown__selected">
				{this.props.options[this.props.options.indexOf(this.state.selected)]}
			</div>
			<div className="dropdown__options">
				{options}
			</div>
		</SelectEle>
	}
}


Select.defaultProps = {
	options: [],
	selected: 0,
}

export default Select;
