import React from 'react';
import styled from '@emotion/styled';

const Element = styled.div`
	vertical-align: top;
    line-height: 10px;

    position: relative;
    padding-left: 15px;

    &::first-letter {
        text-decoration: underline;
	}

	&.disabled {
		color: grey;
	}
    
    &:after {
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        vertical-align: middle;
        line-height: 3;
        content: ' ';
        width: 10px;
        height: 10px;
        background: white;
        border-radius: none;
        border: 1px inset #C0C0C0;
        box-shadow: 1px 1px 0px #ffffff, 0px 1px 0px #ffffff, 1px 0px 0px #ffffff, inset 1px 1px 0px #000000;
	}
	
	&.active:after {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA9SURBVBhXbY7RCgAwCAK1//9nV5Gwxu4lz2KMkvCDpGLyohY1w8G8XpKvd9fZzpFFLqpHOJjb+0Mu9iFwAJvmIfrQ4IxiAAAAAElFTkSuQmCC');
		background-position: center;
		background-repeat: no-repeat;
	}
`;

class Checkbox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: this.props.active,
		}
	}

	clickListener(e) {
		if (!this.props.disabled) {
			this.setState({
				active: !this.state.active,
			});
		}
	}

	render() {
		return <Element 
			onClick={this.clickListener.bind(this)} 
			className={
				(this.state.active ? 'active ' : '') +
				(this.props.disabled ? 'disabled ' : '')
				}>
				{this.props.children}
		</Element>
	}
}


Checkbox.defaultProps = {
	active: false,
	disabled: false,
}

export default Checkbox;