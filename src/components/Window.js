import React from 'react';
import styled from '@emotion/styled';

import {border, window_shadow} from './Styles';

const TitleBar = styled.div`
    background-color: #000080;
    color: #ffffff;
    padding: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TitleBarTitle = styled.span`
	font-weight: 500;
`;

const TitleBarControls = styled.div`
    display: flex;
`;

const TitleBarControl = styled.div`
	${border}
	${window_shadow}
    background-color: #C0C0C0;
    color: black;
    text-align: center;
    padding: 1px;

    margin: 1.5px;

    width: 13px;
    height: 11px;

    background-size: auto;
    background-position: center;
	background-repeat: no-repeat;
	
	&[data-role=help] {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAIAAAAr0JA2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABHSURBVChTYzxw4AADEQBdnYODA5TFwIAsxQSlwQCiCCgNUYGsB0UdHoDdfXCDIVwgwGIepiIgoMxeTIDdXojVyIC69jIwAAD3IxvShLBIHAAAAABJRU5ErkJggg==');
	}
	&[data-role=exit] {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAIAAAAr0JA2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABQSURBVChTrZC7EQAgCEPRyRyd0fSAC5BGC1P4y0OiQ1XlQTPmm5JbptiY6klyHgCGL5CK84E7qhbng0f1zFFfqHHI5JdVtL33jGhH6N9/FtlxCSTUXP5dMQAAAABJRU5ErkJggg==');
	}
`;

const WindowContainer = styled.div`
	${border}
    ${window_shadow}
    transform: scale(1);
    background-color: #C0C0C0;
    padding: 1px;

    min-width: 403px;
	box-sizing: border-box;
	
	position: absolute;
`;

class Window extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			style: {
				left: this.props.x+'px',
				top: this.props.y+'px',
				width: this.props.width+'px',
				height: this.props.height+'px',
				minWidth: this.props.minWidth+'px',
				minHeight: this.props.minHeight+'px',
			},
		}
	}

	updatePosition (x, y) {
		let temp = Object.assign({}, this.state.style);
		this.setState({
			style: Object.assign(temp, {
				left: x+'px',
				top: y+'px',
			})
		});
	}

	mouseDownListener (e) {
		if (!e.target.dataset.role) {
			this.mouseDown = true;
			this.mouseStart = {
				x: e.pageX,
				y: e.pageY,
			}
			this.windowStart = {
				x: Number(this.state.style.left.split('px')[0]),
				y: Number(this.state.style.top.split('px')[0]),
			}
		}
	}
	mouseMoveListener (e) {
		if (this.mouseDown) {
			this.updatePosition(
				(e.pageX - this.mouseStart.x) + this.windowStart.x,
				(e.pageY - this.mouseStart.y) + this.windowStart.y
			);
		}
	}

	mouseUpListener (e) {
		this.mouseDown = false;
	}
	componentDidMount () {
		this.mouseMoveListenerFunc = this.mouseMoveListener.bind(this);
		this.mouseUpListenerFunc = this.mouseUpListener.bind(this);
		window.addEventListener('mousemove', this.mouseMoveListenerFunc);
		window.addEventListener('mouseleave', this.mouseUpListenerFunc);
		window.addEventListener('onblur', this.mouseUpListenerFunc);
	}
	componentWillUnmount () {
		window.removeEventListener('mousemove', this.mouseMoveListenerFunc, true);
		window.removeEventListener('mouseleave', this.mouseUpListenerFunc, true);
		window.removeEventListener('onblur', this.mouseUpListenerFunc, true);
	}

	render() {
		return (
			<WindowContainer onMouseUp={this.mouseUpListener.bind(this)} style={this.state.style}>
				<TitleBar onMouseDown={this.mouseDownListener.bind(this)}>
					<TitleBarTitle>{this.props.title}</TitleBarTitle>
					<TitleBarControls>
						{this.props.controlMinimize ? <TitleBarControl data-role="minimize" /> : <></>}
						{this.props.controlMaximize ? <TitleBarControl data-role="maximize" /> : <></>}
						{this.props.controlHelp ? <TitleBarControl data-role="help" /> : <></>}
						{this.props.controlExit ? <TitleBarControl data-role="exit" /> : <></>}
					</TitleBarControls>
				</TitleBar>

				{this.props.children}

			</WindowContainer>
		);
	}
}

Window.defaultProps = {
	title: "Untitled",
	controlHelp: false,
	controlExit: true,
	controlMinimize: false,
	controlMaximize: false,
	x: 0,
	y: 0,
	width: 403,
	height: 465,
	minWidth: 403,
	minHeight: 465,
}

export default Window;
